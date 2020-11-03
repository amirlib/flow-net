import React from 'react';
import Node from '../Graphs/Node';
import style from './canvas.module.scss';

export default class Canvas extends React.Component {
  static createNodeElement(id, coorX, coorY) {
    return {
      id,
      coorX,
      coorY,
      radius: 25,
      type: 'node',
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      flowArr: [
        Canvas.createNodeElement(0, 50, 350),
        Canvas.createNodeElement(1, 700, 350),
      ],
    };
  }

  componentDidUpdate() {
    const { flowArr } = this.state;

    console.log(flowArr);
  }

  setNode(coorX, coorY) {
    const { flowArr } = this.state;
    const node = Canvas.createNodeElement(flowArr.length, coorX, coorY);

    this.setState((prevState) => ({ flowArr: prevState.flowArr.push(node) }));
  }

  render() {
    const { flowArr } = this.state;

    return (
      <div className={style.canvas}>
        <svg className={style.svg}>
          {flowArr.map((obj) => (
            <Node
              key={`node-${obj.id}`}
              node={obj}
            />
          ))}
        </svg>
      </div>
    );
  }
}
