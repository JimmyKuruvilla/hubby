import {
  Registry
} from './registry'
import {
  GitHubService
} from '../libs/github'
import {
  DragAndDropService
} from '../libs/dragAndDrop'

export class Wiring {
  static init() {
    Registry.init();
    Registry.set(DragAndDropService.name, new Map());
    Registry.set(GitHubService.name, new GitHubService())
  }
}