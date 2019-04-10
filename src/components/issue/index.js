import { h, Component } from 'preact';
import style from './style';
export default class Issue extends Component {
  constructor(props) {
    super();
    const labels = props.issue.displayLabels.map(_ => ({
      ..._,
      style: `background-color: ${_.color}`
    }));
    this.setState({ labels, issue: props.issue });
  }
  render() {
    return (
      <div className={style.issue}>
        <a href={this.state.issue.url}>{this.state.issue.number}</a>
        <textarea className={style.title}>{this.state.issue.title}</textarea>
        <div>{this.state.issue.comments}</div>
        <div className={style.labels}>
          {this.state.labels.map(_ => (
            <div style={_.style} className={style.label}>
              {_.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
