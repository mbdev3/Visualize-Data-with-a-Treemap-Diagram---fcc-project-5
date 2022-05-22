import { line, curveNatural,bandwidth } from 'd3';

export const Marks = ({
  root,
  color,
  onMouseEnter,
  onMouseOut,
  colorMap
  
}) => (
  <g className="mark">
    {root.leaves().map((d, i) => {
   
      const name = d.data.name.split(/(?=[A-Z][^A-Z])/g)
      return (
        <>
        <rect
          className='tile'
          x={d.x0}
          y={d.y0}
          width={d.x1 - d.x0}
          height={d.y1 - d.y0}
          fill={colorMap[i]}
          onMouseEnter={(e) => onMouseEnter(d, e)}
          onMouseOut={() => onMouseOut(null)}
          data-name={d.data.name}
          data-category={d.data.category}
          data-value={d.data.value}
        ></rect>
        <text 
          
          >{name.map((n,i)=><tspan x={d.x0} dx={2} y={d.y0+i*7+8}>{n}</tspan>)}</text>
        
        </>
      );
    })}
  </g>
);
