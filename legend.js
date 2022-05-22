const positionLegendY = (i) => {
  if (i < 6) {
    return 0;
  }
  if (i < 12) {
    return 50;
  }
  if (i < 18) {
    return 100;
  }
};
const positionLegendX = (i) => {
  if (i < 6) {
    return i * 80;
  }
  if (i < 12) {
    return i * 80 - 80 * 6;
  }
  if (i < 18) {
    return i * 80 - 80 * 12;
  }
};
const a = Array.from(Array(18).keys());
export const Legend = ({
  root,
  color,
  innerHeight,
  innerWidth,
 newColorMap
}) => {
  return (
    <g
      id="legend"
      transform={`translate(${innerWidth/4},${
        innerHeight + 50
      })`}
    >
      {root.children.map((d, i) => {
        
        return (
          <>
            <rect
              className="legend-item"
              x={positionLegendX(i)}
              y={positionLegendY(i)}
              width={15}
              height={15}
              fill={newColorMap[i]}
            />
            <text
              x={positionLegendX(i)}
              y={positionLegendY(i)}
              dx={20}
              dy={10}
            >
              {d.data.name}
            </text>
          </>
        );
      })}
    </g>
  );
};
