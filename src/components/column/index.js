import { h, Component } from 'preact';
import style from './style';
import Issue from '../issue';

export default class Column extends Component {
  constructor(props) {
    super(props);
    this.setState({
      columnName: props.columnName,
      issueHtml: props.issues.map(_ => 
        <Issue issue={_} />
      )
    });
  }

  render() {
    return (
      <div className={style.column}>
        <div className={style.title}>{this.state.columnName}</div>
        {this.state.issueHtml}
      </div>
    );
  }
}
