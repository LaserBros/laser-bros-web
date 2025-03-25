// import React, { useState } from 'react';
// import { Helper } from 'dxf';

// const DxfAnalyzer = () => {
//   const [results, setResults] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setFileName(file.name);
//     setLoading(true);
//     setError(null);

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const helper = new Helper(e.target.result);
//         const parsedData = helper.parsed;
//         const analysisResults = analyzeDxf(parsedData);
//         setResults(analysisResults);
//       } catch (err) {
//         console.error('Error processing DXF file:', err);
//         setError('Failed to process DXF file. Please check the file format.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     reader.readAsText(file);
//   };

//   const analyzeDxf = (dxfData) => {
//     const entities = dxfData.entities || [];
//     const groupCounts = {};
//     let totalLength = 0;
//     let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

//     entities.forEach(entity => {
//       // Count entities by layer/group
//       const groupName = entity.layer || 'Undefined';
//       groupCounts[groupName] = (groupCounts[groupName] || 0) + 1;

//       // Process geometry
//       const geometry = processEntityGeometry(entity);
//       if (geometry) {
//         // Calculate length
//         if (geometry.length) {
//           totalLength += geometry.length;
//         }

//         // Update bounding box
//         if (geometry.coordinates) {
//           updateBoundingBox(geometry.coordinates);
//         }
//       }
//     });

//     const boundingBox = {
//       width: maxX !== -Infinity ? maxX - minX : 0,
//       height: maxY !== -Infinity ? maxY - minY : 0
//     };

//     const boundingArea = boundingBox.width * boundingBox.height;

//     return {
//       totalLength,
//       boundingBox,
//       boundingArea,
//       entityCount: entities.length,
//       uniqueGroups: Object.keys(groupCounts).length,
//       groupCounts
//     };

//     function updateBoundingBox(coordinates) {
//       // Flatten nested arrays (for MultiLineString, Polygon, etc.)
//       const flattenCoords = (coords) => {
//         return coords.reduce((acc, val) => 
//           Array.isArray(val[0]) ? [...acc, ...flattenCoords(val)] : [...acc, val], 
//         []);
//       };

//       const flatCoords = flattenCoords(coordinates);
      
//       flatCoords.forEach(([x, y]) => {
//         minX = Math.min(minX, x);
//         minY = Math.min(minY, y);
//         maxX = Math.max(maxX, x);
//         maxY = Math.max(maxY, y);
//       });
//     }
//   };

//   const processEntityGeometry = (entity) => {
//     try {
//       switch (entity.type) {
//         case 'LINE':
//           return {
//             type: 'LineString',
//             coordinates: [
//               [entity.start.x, entity.start.y],
//               [entity.end.x, entity.end.y]
//             ],
//             length: Math.sqrt(
//               Math.pow(entity.end.x - entity.start.x, 2) + 
//               Math.pow(entity.end.y - entity.start.y, 2)
//             )
//           };

//         case 'LWPOLYLINE':
//         case 'POLYLINE':
//           if (entity.vertices && entity.vertices.length > 0) {
//             const coords = entity.vertices.map(v => [v.x, v.y]);
//             if (entity.closed) {
//               coords.push([...coords[0]]); // Close the polyline
//             }
            
//             let length = 0;
//             for (let i = 1; i < coords.length; i++) {
//               const [x1, y1] = coords[i-1];
//               const [x2, y2] = coords[i];
//               length += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
//             }
            
//             return {
//               type: 'LineString',
//               coordinates: coords,
//               length
//             };
//           }
//           break;

//         case 'CIRCLE':
//           return {
//             type: 'Point',
//             coordinates: [entity.center.x, entity.center.y],
//             // Approximate circumference as length
//             length: 2 * Math.PI * entity.radius
//           };

//         case 'ARC':
//           // Simplified - using chord length as approximation
//           const startAngle = entity.startAngle * Math.PI / 180;
//           const endAngle = entity.endAngle * Math.PI / 180;
//           const startX = entity.center.x + entity.radius * Math.cos(startAngle);
//           const startY = entity.center.y + entity.radius * Math.sin(startAngle);
//           const endX = entity.center.x + entity.radius * Math.cos(endAngle);
//           const endY = entity.center.y + entity.radius * Math.sin(endAngle);
          
//           return {
//             type: 'LineString',
//             coordinates: [
//               [startX, startY],
//               [endX, endY]
//             ],
//             length: Math.sqrt(
//               Math.pow(endX - startX, 2) + 
//               Math.pow(endY - startY, 2))
//           };

//         case 'SPLINE':
//           if (entity.controlPoints && entity.controlPoints.length > 0) {
//             const coords = entity.controlPoints.map(p => [p.x, p.y]);
            
//             let length = 0;
//             for (let i = 1; i < coords.length; i++) {
//               const [x1, y1] = coords[i-1];
//               const [x2, y2] = coords[i];
//               length += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
//             }
            
//             return {
//               type: 'LineString',
//               coordinates: coords,
//               length
//             };
//           }
//           break;

//         // Add more entity types as needed
//         default:
//           return null;
//       }
//     } catch (err) {
//       console.error(`Error processing entity ${entity.type}:`, err);
//       return null;
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h2>DXF File Analyzer</h2>
      
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="file"
//           accept=".dxf"
//           onChange={handleFileUpload}
//           disabled={loading}
//         />
//       </div>
      
//       {loading && <p>Processing DXF file...</p>}
      
//       {error && (
//         <div style={{ color: 'red', margin: '10px 0' }}>
//           {error}
//         </div>
//       )}
      
//       {results && (
//         <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
//           <h3>Analysis Results for: {fileName}</h3>
          
//           <div style={{ marginTop: '15px' }}>
//             <h4>Summary Metrics</h4>
//             <ul>
//               <li><strong>Total Linear Length:</strong> {results.totalLength.toFixed(4)} units</li>
//               <li><strong>Bounding Box:</strong> {results.boundingBox.width.toFixed(4)} × {results.boundingBox.height.toFixed(4)}</li>
//               <li><strong>Bounding Area:</strong> {results.boundingArea.toFixed(4)} square units</li>
//               <li><strong>Entity Count:</strong> {results.entityCount}</li>
//               <li><strong>Unique Groups/Layers:</strong> {results.uniqueGroups}</li>
//             </ul>
//           </div>
          
//           <div style={{ marginTop: '15px' }}>
//             <h4>Group/Layer Counts</h4>
//             <ul style={{ columns: '2', columnGap: '20px' }}>
//               {Object.entries(results.groupCounts).map(([group, count]) => (
//                 <li key={group}>
//                   <strong>{group}:</strong> {count}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DxfAnalyzer;