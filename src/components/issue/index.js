import { h, Component } from 'preact';
import style from './style';
import  { Registry, l } from '../../libs/registry';

export default class Issue extends Component {
  constructor(props) {
    super(props);
    const labels = props.issue.displayLabels.map(_ => ({
      ..._,
      style: `background-color: ${_.color}`
    }));
    this.setState({ labels, issue: props.issue, topDropZoneActive: false });

    this._dnd = Registry.get(l.dnd);
    this.id = props.issue.number;
    console.log(props)
    this._dnd.set(this.id, {issue: props.issue})
  }

  getData(ev) {
    const id = Number(ev.dataTransfer.getData("text/plain"));
    return this._dnd.get(id);
  }

  dragStartHandler = (ev) => {
    ev.dataTransfer.setData("text/plain", this.id);
  }

  topDropZoneDragOverHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
    this.setState({
      topDropZoneActive: true
    })
  }

  topDropZoneDropHandler = (ev) => {
    ev.preventDefault();
    this.setState({
      topDropZoneActive: false
    })
    const issueData = this.getData(ev);
  }

  topDropZoneDragLeaveHandler = (ev) => {
    ev.preventDefault();
    this.setState({
      topDropZoneActive: false
    })
  }

  issueDragLeaveHandler = (ev) => {
    ev.preventDefault();
    this.setState({
      topDropZoneActive: false
    })
  }

  issueDragOverHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
    this.setState({
      topDropZoneActive: true
    })
  }

  issueDropHandler = (ev) => {
    ev.preventDefault();
    this.setState({
      topDropZoneActive: false
    })
    const issueData = this.getData(ev);
    console.log('bottom');
  }

  render() {
    return (
      <div class="i">
        < div className = {
          this.state.topDropZoneActive ? style.topdropzoneactive : style.topdropzone
        }
          onDrop={this.topDropZoneDropHandler} 
          onDragOver={this.topDropZoneDragOverHandler}
          onDragLeave={this.topDropZoneDragLeaveHandler}
          >
        </div>

        <div className={style.issue}
          draggable="true" 
          onDragStart={this.dragStartHandler}
          onDrop={this.issueDropHandler}
          onDragOver={this.issueDragOverHandler}
          onDragLeave={this.issueDragLeaveHandler}>

          <div className={style.header}>
            <a href={this.state.issue.url}>{this.state.issue.number}</a>

            <div className={style.avatars}>
              {this.state.issue.assignees.map(_ => (
                <img src={_.avatarUrl} alt={_.name}>
                  {_.name}
                </img>
              ))}
            </div>

          </div>

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
      </div>
    );
  }
}
