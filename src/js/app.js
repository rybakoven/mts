import Tabs from './modules/tabs'
import Sort from './modules/filters'

class Channels {
  constructor() {
    this.container = document.querySelector('#channels');
    this.currentPage = 0;
    this.channelsJSON = null;
    this.prepareData = null;
    this.getChannels();
    this.tabs = new Tabs();
  }

  async getChannels () {
    return await fetch('src/js/store/channels.json')
      .then(response => response.json())
      .then(response => {
        this.channelsJSON = response.channelDetails ?
          response.channelDetails : new Error('bad data');
        this.render();
      })
      .catch(error => console.log(error.message));
  }

  empty() {
    this.container.innerHTML = '';
  }

  render(sortData) {
    this.empty();

    const currentChannels = this.prepareDataForPage(sortData);

    currentChannels.forEach(channel => {

      let node = document.createElement('div');
      node.classList.add('channel-item');
      node.style.backgroundImage = `url(${channel.picture.backgrounds[0]})`;

      this.container.append(node);
    });

    this.createHint();  //one for all items
    this.addListeners();
  }

  createHint(channel) {

  }

  addListeners() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('channel-item')) {
        alert('show hint');
      }
    });
  }

  prepareDataForPage(sortData) {
    this.prepareData = sortData || new Sort(this.channelsJSON);
    const currentStack = this.currentPage * 24;
    return this.prepareData.slice(currentStack, currentStack + 24);
  }
}

const channels = new Channels();

export default channels
