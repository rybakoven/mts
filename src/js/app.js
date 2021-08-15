class Channels {
  constructor() {
    this.container = document.querySelector('#channels-container');
    this.currentPage = 1;
    this.sortType = 1;
    this.channelsJSON = null;
    this.getChannels();
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

  render() {
    const currentChannels = this.prepareDataForPage();

    currentChannels.forEach(channel => {

      let node = document.createElement('div');
      node.classList.add('channel-item');
      node.style.backgroundImage = `url(${channel.picture.backgrounds[0]})`;

      //

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

  prepareDataForPage() {
    const currentStack = this.currentPage * 24;
    let currentChannels = this.channelsJSON.slice(currentStack, currentStack + 24);
    //sort
    return currentChannels;
  }

  sort() {

  }
}

const channels = new Channels();
