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
        const analysisResults = analyzeDxf(parsedData)
        setResults(analysisResults)
      } catch (err) {
        console.error("Error processing DXF file:", err)
        setError(`Failed to process DXF file: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    reader.readAsText(file)
  }

  const analyzeDxf = (dxfData) => {
    const entities = dxfData.entities || []
    const groupCounts = {}
    let totalLength = 0
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    const processedEntities = entities.map(entity => {
      const geometry = processEntityGeometry(entity)
      if (!geometry) return null

      // Update bounding box
      if (geometry.coordinates) {
        geometry.coordinates.forEach(([x, y]) => {
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        })
      }

      // Count by layer
      const layer = entity.layer || "0"
      groupCounts[layer] = (groupCounts[layer] || 0) + 1

      return {
        ...geometry,
        type: entity.type,
        layer,
        handle: entity.handle
      }
    }).filter(Boolean)

    // Calculate pierce count with optimized algorithm
    const pierceCount = calculateOptimizedPierceCount(processedEntities)

    return {
      pierceCount,
      entityCount: entities.length,
      uniqueLayers: Object.keys(groupCounts).length,
      groupCounts,
      boundingBox: {
        width: maxX !== -Infinity ? maxX - minX : 0,
        height: maxY !== -Infinity ? maxY - minY : 0
      },
      totalLength: totalLength.toFixed(4),
      processedEntities: processedEntities.length
    }
  }

  // Optimized pierce count calculation
  const calculateOptimizedPierceCount = (entities) => {
    const TOLERANCE = 0.001
    let pierceCount = 0

    // Process closed shapes (each counts as one pierce)
    const closedShapes = entities.filter(e => e.closed)
    pierceCount += closedShapes.length

    // Process text entities (each counts as one pierce)
    const textEntities = entities.filter(e => e.type === "TEXT" || e.type === "MTEXT")
    pierceCount += textEntities.length

    // Process open paths with optimized grouping
    const openPaths = entities.filter(e => !e.closed && e.type !== "TEXT" && e.type !== "MTEXT")
    if (openPaths.length > 0) {
      const pathGroups = groupPathsOptimized(openPaths, TOLERANCE)
      pierceCount += pathGroups.length
    }

    return pierceCount
  }

  // Optimized path grouping algorithm
  const groupPathsOptimized = (paths, tolerance) => {
    const groups = []
    const pointMap = new Map() // For faster endpoint lookups

    // Pre-process all endpoints
    paths.forEach((path, index) => {
      const start = path.coordinates[0]
      const end = path.coordinates[path.coordinates.length - 1]
      
      const startKey = `${Math.round(start[0]/tolerance)}_${Math.round(start[1]/tolerance)}`
      const endKey = `${Math.round(end[0]/tolerance)}_${Math.round(end[1]/tolerance)}`
      
      if (!pointMap.has(startKey)) pointMap.set(startKey, [])
      if (!pointMap.has(endKey)) pointMap.set(endKey, [])
      
      pointMap.get(startKey).push({ index, isStart: true })
      pointMap.get(endKey).push({ index, isStart: false })
    })

    const visited = new Set()
    
    paths.forEach((_, index) => {
      if (visited.has(index)) return
      
      const group = []
      const queue = [index]
      visited.add(index)
      
      while (queue.length > 0) {
        const currentIdx = queue.pop()
        group.push(paths[currentIdx])
        
        const currentPath = paths[currentIdx]
        const endpoints = [
          currentPath.coordinates[0],
          currentPath.coordinates[currentPath.coordinates.length - 1]
        ]
        
        endpoints.forEach(point => {
          const key = `${Math.round(point[0]/tolerance)}_${Math.round(point[1]/tolerance)}`
          const connectedPaths = pointMap.get(key) || []
          
          connectedPaths.forEach(({ index: otherIdx }) => {
            if (!visited.has(otherIdx)) {
              visited.add(otherIdx)
              queue.push(otherIdx)
            }
          })
        })
      }
      
      if (group.length > 0) {
        groups.push(group)
      }
    })

    return groups
  }

  const processEntityGeometry = (entity) => {
    if (!entity?.type) return null

    try {
      switch (entity.type) {
        case "LINE":
          if (!entity.start || !entity.end) return null
          return {
            coordinates: [
              [entity.start.x, entity.start.y],
              [entity.end.x, entity.end.y]
            ],
            closed: false,
            length: Math.hypot(entity.end.x - entity.start.x, entity.end.y - entity.start.y)
          }

        case "LWPOLYLINE":
        case "POLYLINE":
          if (!entity.vertices?.length) return null
          
          const coords = entity.vertices.map(v => [v.x, v.y])
          let isClosed = entity.closed
          
          // Check if first and last points match
          if (!isClosed && coords.length > 1) {
            const first = coords[0]
            const last = coords[coords.length - 1]
            isClosed = Math.hypot(first[0] - last[0], first[1] - last[1]) < 0.001
          }

          // Calculate length
          let length = 0
          for (let i = 1; i < coords.length; i++) {
            length += Math.hypot(coords[i][0] - coords[i-1][0], coords[i][1] - coords[i-1][1])
          }

          return {
            coordinates: coords,
            closed: isClosed,
            length
          }

        case "CIRCLE":
          if (!entity.center || entity.radius == null) return null
          return {
            coordinates: [[entity.center.x, entity.center.y]],
            closed: true,
            length: 2 * Math.PI * entity.radius
          }

        case "ARC":
          if (!entity.center || entity.radius == null) return null
          return {
            coordinates: [[entity.center.x, entity.center.y]],
            closed: false,
            length: (Math.abs(entity.endAngle - entity.startAngle) / 360) * (2 * Math.PI * entity.radius)
          }

        case "TEXT":
        case "MTEXT":
          const pos = entity.position || entity.insertionPoint
          if (!pos) return null
          return {
            coordinates: [[pos.x, pos.y]],
            closed: false,
            length: 0
          }

        default:
          return null
      }
    } catch (err) {
      console.error(`Error processing ${entity.type}:`, err)
      return null
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>DXF Pierce Count Analyzer</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".dxf" onChange={handleFileUpload} disabled={loading} />
      </div>

      {loading && <p>Processing DXF file...</p>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {results && (
        <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
          <h3>Results for: {fileName}</h3>
          <div>
            <p><strong>Pierce Count:</strong> {results.pierceCount}</p>
            <p><strong>Total Length:</strong> {results.totalLength} units</p>
            <p><strong>Entities Processed:</strong> {results.processedEntities}</p>
            <p><strong>Bounding Box:</strong> {results.boundingBox.width.toFixed(4)} × {results.boundingBox.height.toFixed(4)}</p>
            
            <h4>Layer Breakdown:</h4>
            <ul>
              {Object.entries(results.groupCounts).map(([layer, count]) => (
                <li key={layer}>{layer}: {count} entities</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default DxfAnalyzer