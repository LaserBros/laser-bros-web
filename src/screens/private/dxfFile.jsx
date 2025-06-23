"use client"

import { useState } from "react"
import { Helper } from "dxf"

const DxfAnalyzer = () => {
  const [results, setResults] = useState(null)
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    setFileName(file.name)
    setLoading(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const helper = new Helper(e.target.result)
        const parsedData = helper.parsed

        // Debug the structure
        // console.log("DXF Structure:", {
        //   header: parsedData.header ? "Present" : "Missing",
        //   tables: parsedData.tables ? Object.keys(parsedData.tables) : "Missing",
        //   blocks: parsedData.blocks ? Object.keys(parsedData.blocks) : "Missing",
        //   entities: parsedData.entities ? `${parsedData.entities.length} entities` : "Missing",
        // })

        // Log a sample of entities for debugging
        if (parsedData.entities && parsedData.entities.length > 0) {
          // console.log("Sample entities:", parsedData.entities.slice(0, 3))
        }

        const analysisResults = analyzeDxf(parsedData)
        setResults(analysisResults)
      } catch (err) {
        console.error("Error processing DXF file:", err)
        setError(`Failed to process DXF file: ${err.message}. Please check the file format.`)
      } finally {
        setLoading(false)
      }
    }
    reader.readAsText(file)
  }

  const analyzeDxf = (dxfData) => {
    try {
      const entities = dxfData.entities || []
      const groupCounts = {}
      let totalLength = 0
      let minX = Number.POSITIVE_INFINITY,
        minY = Number.POSITIVE_INFINITY,
        maxX = Number.NEGATIVE_INFINITY,
        maxY = Number.NEGATIVE_INFINITY

      // Define updateBoundingBox function inside analyzeDxf
      const updateBoundingBox = (coordinates) => {
        // Flatten nested arrays (for MultiLineString, Polygon, etc.)
        const flattenCoords = (coords) => {
          return coords.reduce(
            (acc, val) => (Array.isArray(val[0]) ? [...acc, ...flattenCoords(val)] : [...acc, val]),
            [],
          )
        }

        const flatCoords = flattenCoords(coordinates)

        flatCoords.forEach(([x, y]) => {
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        })
      }

      // For improved pierce count calculation
      const processedEntities = []
      const entityTypes = {}

      // First pass: process all entities and extract their geometries
      entities.forEach((entity) => {
        // Count entities by layer/group
        const groupName = entity.layer || "Undefined"
        groupCounts[groupName] = (groupCounts[groupName] || 0) + 1

        // Count entity types
        entityTypes[entity.type] = (entityTypes[entity.type] || 0) + 1

        // Process geometry
        const geometry = processEntityGeometry(entity)
        if (geometry) {
          processedEntities.push({
            ...geometry,
            entityType: entity.type,
            layer: entity.layer,
            handle: entity.handle,
          })

          // Calculate length
          if (geometry.length) {
            totalLength += geometry.length
          }

          // Update bounding box
          if (geometry.coordinates) {
            updateBoundingBox(geometry.coordinates)
          }
        }
      })

      // Improved pierce count calculation
      const pierceCount = calculatePierceCount(processedEntities)

      const boundingBox = {
        width: maxX !== Number.NEGATIVE_INFINITY ? maxX - minX : 0,
        height: maxY !== Number.NEGATIVE_INFINITY ? maxY - minY : 0,
      }

      const boundingArea = boundingBox.width * boundingBox.height

      return {
        totalLength,
        boundingBox,
        boundingArea,
        entityCount: entities.length,
        uniqueGroups: Object.keys(groupCounts).length,
        groupCounts,
        pierceCount,
        entityTypes,
        processedEntitiesCount: processedEntities.length,
      }
    } catch (err) {
      console.error("Error during DXF analysis:", err)
      throw err
    }
  }

  // Improved pierce count calculation
  const calculatePierceCount = (processedEntities) => {
    // Group entities by layer for better analysis
    const entitiesByLayer = {}
    processedEntities.forEach((entity) => {
      const layer = entity.layer || "default"
      if (!entitiesByLayer[layer]) {
        entitiesByLayer[layer] = []
      }
      entitiesByLayer[layer].push(entity)
    })

    let totalPierceCount = 0

    // Process each layer separately
    Object.keys(entitiesByLayer).forEach((layer) => {
      const layerEntities = entitiesByLayer[layer]

      // Count closed shapes (each is one pierce)
      const closedShapes = layerEntities.filter((entity) => entity.closed)
      totalPierceCount += closedShapes.length

      // Handle text entities specially
      const textEntities = layerEntities.filter(
        (entity) => entity.entityType === "TEXT" || entity.entityType === "MTEXT",
      )

      // Each text entity is typically one pierce
      // (simplified approach - in reality, it depends on the font and cutting strategy)
      totalPierceCount += textEntities.length

      // Handle open paths
      const openPaths = layerEntities.filter(
        (entity) => !entity.closed && entity.entityType !== "TEXT" && entity.entityType !== "MTEXT",
      )

      // For simple designs like logos, each disconnected path is typically one pierce
      // This is a simplified approach - in real CNC/laser cutting, path optimization might be more complex
      if (openPaths.length > 0) {
        // Group connected paths
        const pathGroups = groupConnectedPaths(openPaths)
        totalPierceCount += pathGroups.length
      }
    })

    return totalPierceCount
  }

  // Group connected paths to identify separate pierces
  const groupConnectedPaths = (paths) => {
    if (paths.length === 0) return []

    const TOLERANCE = 0.001 // Tolerance for point equality
    const pathGroups = []
    const processed = new Set()

    // Function to check if two points are equal within tolerance
    const pointsEqual = (p1, p2) => {
      if (!p1 || !p2) return false
      const dx = p1[0] - p2[0]
      const dy = p1[1] - p2[1]
      return Math.sqrt(dx * dx + dy * dy) < TOLERANCE
    }

    // Function to find all paths connected to the current path
    const findConnectedPaths = (pathIndex, group) => {
      if (processed.has(pathIndex)) return

      processed.add(pathIndex)
      group.push(paths[pathIndex])

      const currentPath = paths[pathIndex]
      const startPoint = currentPath.coordinates[0]
      const endPoint = currentPath.coordinates[currentPath.coordinates.length - 1]

      // Check all other paths to see if they connect to this one
      for (let i = 0; i < paths.length; i++) {
        if (processed.has(i)) continue

        const otherPath = paths[i]
        const otherStart = otherPath.coordinates[0]
        const otherEnd = otherPath.coordinates[otherPath.coordinates.length - 1]

        // Check if any endpoints connect
        if (
          pointsEqual(endPoint, otherStart) ||
          pointsEqual(endPoint, otherEnd) ||
          pointsEqual(startPoint, otherStart) ||
          pointsEqual(startPoint, otherEnd)
        ) {
          findConnectedPaths(i, group)
        }
      }
    }

    // Find all connected path groups
    for (let i = 0; i < paths.length; i++) {
      if (!processed.has(i)) {
        const group = []
        findConnectedPaths(i, group)
        pathGroups.push(group)
      }
    }

    return pathGroups
  }

  const processEntityGeometry = (entity) => {
    if (!entity || !entity.type) {
      console.log("Invalid entity:", entity)
      return null
    }

    try {
      switch (entity.type) {
        case "LINE":
          try {
            if (!entity.start || !entity.end) {
              // console.log("Line entity missing start/end:", entity)
              return null
            }

            return {
              type: "LineString",
              coordinates: [
                [entity.start.x, entity.start.y],
                [entity.end.x, entity.end.y],
              ],
              length: Math.sqrt(
                Math.pow(entity.end.x - entity.start.x, 2) + Math.pow(entity.end.y - entity.start.y, 2),
              ),
              closed: false,
            }
          } catch (err) {
            console.error("Error processing LINE entity:", err)
            return null
          }

        case "LWPOLYLINE":
        case "POLYLINE":
          try {
            if (!entity.vertices || entity.vertices.length === 0) {
              // console.log("Polyline entity missing vertices:", entity)
              return null
            }

            const coords = entity.vertices.map((v) => [v.x, v.y])

            // Check if the polyline is closed
            let isClosed = Boolean(entity.closed)

            // Also check if first and last points are the same
            if (!isClosed && coords.length > 2) {
              const firstPoint = coords[0]
              const lastPoint = coords[coords.length - 1]
              isClosed =
                Math.abs(firstPoint[0] - lastPoint[0]) < 0.001 && Math.abs(firstPoint[1] - lastPoint[1]) < 0.001
            }

            let length = 0
            for (let i = 1; i < coords.length; i++) {
              const [x1, y1] = coords[i - 1]
              const [x2, y2] = coords[i]
              length += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            }

            // If closed, add the distance from last to first point
            if (
              isClosed &&
              coords.length > 1 &&
              (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1])
            ) {
              const [x1, y1] = coords[coords.length - 1]
              const [x2, y2] = coords[0]
              length += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            }

            return {
              type: "LineString",
              coordinates: coords,
              length,
              closed: isClosed,
            }
          } catch (err) {
            console.error("Error processing POLYLINE entity:", err)
            return null
          }

        case "CIRCLE":
          try {
            // Extract circle properties with fallbacks
            let centerX = 0,
              centerY = 0,
              radius = 0

            // Try different property paths that might exist in the entity
            if (entity.center && typeof entity.center.x === "number" && typeof entity.center.y === "number") {
              centerX = entity.center.x
              centerY = entity.center.y
            } else if (
              entity.position &&
              typeof entity.position.x === "number" &&
              typeof entity.position.y === "number"
            ) {
              centerX = entity.position.x
              centerY = entity.position.y
            }

            // Get radius with fallbacks
            if (typeof entity.radius === "number") {
              radius = entity.radius
            }

            // Generate points around the circle
            const circlePoints = []
            const steps = 36 // Number of points to approximate the circle
            for (let i = 0; i <= steps; i++) {
              const angle = (i / steps) * 2 * Math.PI
              const x = centerX + radius * Math.cos(angle)
              const y = centerY + radius * Math.sin(angle)
              circlePoints.push([x, y])
            }

            return {
              type: "Polygon",
              coordinates: circlePoints,
              length: 2 * Math.PI * radius,
              closed: true, // Circles are always closed
            }
          } catch (err) {
            console.error("Error processing CIRCLE entity:", err)
            return null
          }

        case "ARC":
          try {
            // Extract arc properties with fallbacks
            let centerX = 0,
              centerY = 0,
              radius = 0
            let startAngle = 0,
              endAngle = 0

            // Try different property paths
            if (entity.center && typeof entity.center.x === "number" && typeof entity.center.y === "number") {
              centerX = entity.center.x
              centerY = entity.center.y
            }

            // Get radius
            if (typeof entity.radius === "number") {
              radius = entity.radius
            }

            // Get angles
            if (typeof entity.startAngle === "number") {
              startAngle = entity.startAngle
            }
            if (typeof entity.endAngle === "number") {
              endAngle = entity.endAngle
            }

            // Handle angle wrapping
            if (endAngle < startAngle) {
              endAngle += 360
            }

            const angleRange = endAngle - startAngle
            const arcLength = (angleRange / 360) * (2 * Math.PI * radius)

            // Generate points along the arc
            const arcPoints = []
            const arcSteps = 36
            for (let i = 0; i <= arcSteps; i++) {
              const angle = ((startAngle + (i / arcSteps) * angleRange) * Math.PI) / 180
              const x = centerX + radius * Math.cos(angle)
              const y = centerY + radius * Math.sin(angle)
              arcPoints.push([x, y])
            }

            return {
              type: "LineString",
              coordinates: arcPoints,
              length: arcLength,
              closed: Math.abs(angleRange - 360) < 0.001, // Closed if it's a full circle
            }
          } catch (err) {
            console.error("Error processing ARC entity:", err)
            return null
          }

        case "ELLIPSE":
          try {
            // Extract ellipse properties with fallbacks
            let centerX = 0,
              centerY = 0
            let majorX = 1,
              majorY = 0
            let ratio = 0.5

            // Get center
            if (entity.center && typeof entity.center.x === "number" && typeof entity.center.y === "number") {
              centerX = entity.center.x
              centerY = entity.center.y
            }

            // Get major axis
            if (entity.majorAxis && typeof entity.majorAxis.x === "number" && typeof entity.majorAxis.y === "number") {
              majorX = entity.majorAxis.x
              majorY = entity.majorAxis.y
            }

            // Get ratio
            if (typeof entity.ratio === "number") {
              ratio = entity.ratio
            }

            // Calculate major and minor axis lengths
            const majorLength = Math.sqrt(Math.pow(majorX, 2) + Math.pow(majorY, 2))
            const minorLength = majorLength * ratio

            // Calculate rotation angle of the ellipse
            const rotation = Math.atan2(majorY, majorX)

            // Generate points around the ellipse
            const ellipsePoints = []
            const ellipseSteps = 36
            for (let i = 0; i <= ellipseSteps; i++) {
              const angle = (i / ellipseSteps) * 2 * Math.PI

              // Parametric equation of ellipse
              const x =
                centerX +
                majorLength * Math.cos(angle) * Math.cos(rotation) -
                minorLength * Math.sin(angle) * Math.sin(rotation)
              const y =
                centerY +
                majorLength * Math.cos(angle) * Math.sin(rotation) +
                minorLength * Math.sin(angle) * Math.cos(rotation)

              ellipsePoints.push([x, y])
            }

            return {
              type: "Polygon",
              coordinates: ellipsePoints,
              length: 2 * Math.PI * Math.sqrt((Math.pow(majorLength, 2) + Math.pow(minorLength, 2)) / 2),
              closed: true, // Ellipses are always closed
            }
          } catch (err) {
            console.error("Error processing ELLIPSE entity:", err)
            return null
          }

        case "SPLINE":
          try {
            let points = []

            // Try to get points from different properties
            if (entity.controlPoints && entity.controlPoints.length > 0) {
              points = entity.controlPoints
            } else if (entity.fitPoints && entity.fitPoints.length > 0) {
              points = entity.fitPoints
            } else {
              // console.log("Spline entity missing points:", entity)
              return null
            }

            const coords = points.map((p) => [p.x, p.y])

            // Check if the spline is closed
            const isClosed =
              entity.closed ||
              (coords.length > 2 &&
                Math.abs(coords[0][0] - coords[coords.length - 1][0]) < 0.001 &&
                Math.abs(coords[0][1] - coords[coords.length - 1][1]) < 0.001)

            let length = 0
            for (let i = 1; i < coords.length; i++) {
              const [x1, y1] = coords[i - 1]
              const [x2, y2] = coords[i]
              length += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            }

            return {
              type: "LineString",
              coordinates: coords,
              length,
              closed: isClosed,
            }
          } catch (err) {
            console.error("Error processing SPLINE entity:", err)
            return null
          }

        case "TEXT":
        case "MTEXT":
          try {
            // For text entities, we'll just return the insertion point
            let posX = 0,
              posY = 0

            if (entity.position && typeof entity.position.x === "number" && typeof entity.position.y === "number") {
              posX = entity.position.x
              posY = entity.position.y
            } else if (
              entity.insertionPoint &&
              typeof entity.insertionPoint.x === "number" &&
              typeof entity.insertionPoint.y === "number"
            ) {
              posX = entity.insertionPoint.x
              posY = entity.insertionPoint.y
            }

            return {
              type: "Point",
              coordinates: [[posX, posY]],
              text: entity.text || "",
              length: 0,
              closed: false,
            }
          } catch (err) {
            console.error("Error processing TEXT entity:", err)
            return null
          }

        default:
          // console.log(`Unhandled entity type: ${entity.type}`)
          return null
      }
    } catch (err) {
      console.error(`Error processing entity ${entity.type}:`, err)
      return null
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>DXF File Analyzer with Improved Pierce Count</h2>

      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".dxf" onChange={handleFileUpload} disabled={loading} />
      </div>

      {loading && <p>Processing DXF file...</p>}

      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      {results && (
        <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
          <h3>Analysis Results for: {fileName}</h3>

          <div style={{ marginTop: "15px" }}>
            <h4>Summary Metrics</h4>
            <ul>
              <li>
                <strong>Total Linear Length:</strong> {results.totalLength.toFixed(4)} units
              </li>
              <li>
                <strong>Bounding Box:</strong> {results.boundingBox.width.toFixed(4)} ×{" "}
                {results.boundingBox.height.toFixed(4)}
              </li>
              <li>
                <strong>Bounding Area:</strong> {results.boundingArea.toFixed(4)} square units
              </li>
              <li>
                <strong>Entity Count:</strong> {results.entityCount}
              </li>
              <li>
                <strong>Unique Groups/Layers:</strong> {results.uniqueGroups}
              </li>
              <li>
                <strong>Pierce Count:</strong> {results.pierceCount}
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "15px" }}>
            <h4>Entity Types</h4>
            <ul>
              {Object.entries(results.entityTypes).map(([type, count]) => (
                <li key={type}>
                  <strong>{type}:</strong> {count}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "15px" }}>
            <h4>Group/Layer Counts</h4>
            <ul style={{ columns: "2", columnGap: "20px" }}>
              {Object.entries(results.groupCounts).map(([group, count]) => (
                <li key={group}>
                  <strong>{group}:</strong> {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h4>Debug Information</h4>
          <button
            onClick={() => console.log("Full results:", results)}
            style={{
              padding: "5px 10px",
              background: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            Log Full Results to Console
          </button>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              maxHeight: "200px",
              overflow: "auto",
              padding: "10px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {`Entity Types: ${JSON.stringify(results.entityTypes, null, 2)}\n\nPierce Count: ${results.pierceCount}`}
          </div>
        </div>
      )}
    </div>
  )
}

export default DxfAnalyzer

