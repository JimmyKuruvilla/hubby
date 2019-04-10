import { h, Component } from 'preact';
import style from './style';
import { gh } from '../../libs/github';
import Column from '../../components/column';
const COLUMNS = {
  backlog: 'backlog'
};
export default class Board extends Component {
  componentWillMount = async () => {
    await this.refreshIssues();
  };

  refreshIssues = async () => {
    const columns = new Map([
      [COLUMNS.backlog, []],
      ['ready', []],
      ['developing', []],
      ['reviewing', []],
      ['dev', []],
      ['testing', []],
      ['deploy to preprod', []],
      ['preprod', []],
      ['deploy to prod', []],
      ['prod', []],
      ['closed', []]
    ]);

    const res = await gh();
    const issues = res.data.repository.issues.edges.map(e => {
      const labels = e.node.labels.edges.map(e => ({
        name: e.node.name,
        color: 'green'
      }));
      const columnNameViaLabel = labels.find(_ => columns.has(_.name));
      const columnName = columnNameViaLabel ?  columnNameViaLabel.name : COLUMNS.backlog;
      return {
        number: e.node.number,
        title: e.node.title,
        url: e.node.url,
        comments: e.node.comments.edges.map(e => e.node),
        allLabels: labels,
        displayLabels: labels.filter(_ => !columns.has(_.name)),
        columnName,
        testInfo: e
      };
    });

    issues.forEach(_ => {
      try {
        columns.get(_.columnName).push(_);
      } catch (e) {
        console.log('error pushing into columns array', e);
      }
    });
    const columnHtml = [];
    columns.forEach((v, k) => {
      columnHtml.push(<Column issues={v} columnName={k} />);
    });
    this.setState({
      columnHtml
    });
  };

  render() {
    return <div className={style.board}>{this.state.columnHtml}</div>;
  }
}
