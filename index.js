import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';

import { Marks } from './Marks';
import { Legend } from './legend';
import {
  scaleOrdinal,
  interpolateRgb,
  treemapResquarify,
} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 50,
  bottom: 50,
  right: 50,
  left: 50,
};
const innerHeight =
  height - margin.top - margin.bottom;
const innerWidth =
  width - margin.right - margin.left;

const App = () => {
  const data = useData();

  const [tool, setTool] = useState([]);
  if (!data) {
    return <pre>loading..</pre>;
  }

  const fader = (color) => {
    return interpolateRgb(color)(0);
  };
  const color = scaleOrdinal().range(
    [
      '#8dd3c7',
      '#ffffb3',
      '#bebada',
      '#fb8072',
      '#80b1d3',
      '#fdb462',
      '#b3de69',
      '#fccde5',
      '#d9d9d9',
      '#bc80bd',
      '#ccebc5',
      '#ffed6f',
      '#66c2a5',
      '#fc8d62',
      '#8da0cb',
      '#e78ac3',
      '#a6d854',
      '#ffd92f',
      '#e5c494',
      '#b3b3b3',
    ].map(fader)
  );

  const treemap = d3
    .treemap()
    .tile(treemapResquarify)
    .size([innerWidth, innerHeight])
    .paddingInner(1);

  const root = d3
    .hierarchy(data)
    .eachBefore(function (d) {
      d.data.id =
        (d.parent ? d.parent.data.id + '.' : '') +
        d.data.name;
    })
    .sum(function (d) {
      return (d.value = +d.value);
    })
    .sort(function (a, b) {
      return (
        b.height - a.height || b.value - a.value
      );
    });

  treemap(root);

  const c = () => {
    let a = [];
    root.leaves().map((d) => {
      a.push(color(d.data.category));
    });
    return a;
  };
  const colorMap = c();
  let newColorMap = [...new Set(colorMap)];

  const onMouseMove = (e) => {
    const [n, c, v] = tool;

    e.pageX > innerWidth / 2
      ? (e.pageX = e.pageX - 150) &&
        (e.pageY = e.pageY - 100)
      : e.pageX + 40;
    tooldiv
      .style('opacity', 1)
      .html(
        () =>
          `<span>Name:</span> ${n}</br> <span>Categrogy:</span> ${c}</br> <span>Value:</span> ${v}`
      )
      .style('top', e.pageY - 40 + 'px')
      .style('left', e.pageX + 40 + 'px')
      .attr('data-value', v);
  };

  const onMouseEnter = (d, e) => {
    let n = d.data.name;
    let c = d.data.category;
    let v = d.data.value;
    setTool([n, c, v]);
  };
  const onMouseOut = (d) => {
    tooldiv.style('opacity', 0);
  };
  return (
    <>
      <div id="title">
        <h1>Video Game Sales</h1>
        <p id="description">
          Top 100 Most Sold Video Games Grouped by
          Platform
        </p>
      </div>
			<div className="copyright">
        Made by
        <a href="https://thembdev.com">
          <img src={"https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg"} alt="mbdev" />
        </a>
      </div>
      <g>
        <svg
          width={width}
          height={height + 100}
          transform={`translate(${
            margin.left
          },${0})`}
        >
          <g
            width={innerWidth}
            height={innerHeight}
            onMouseMove={(e) => onMouseMove(e)}
          >
            <Marks
              root={root}
              color={color}
              colorMap={colorMap}
              onMouseEnter={(e, d) =>
                onMouseEnter(e, d)
              }
              onMouseOut={() => onMouseOut()}
            />
          </g>

          <Legend
            color={color}
            newColorMap={newColorMap}
            root={root}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </svg>
      </g>
      
    </>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
