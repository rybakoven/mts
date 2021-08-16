import app from '../app'

class Filters {
  constructor(data) {
    this.defData = data;
    this.filterWrapper = document.querySelectorAll('.filter-item');
    this.sortType = 'def';
    this.addListeners();
  }

  addListeners() {
    document.body.addEventListener('click', (e) => {
      const el = e.target;
      if (el.classList.contains('filter-header')) {
        e.preventDefault();
        this.showList(e.target.parentNode);
      } else if (el.dataset.sort) {
        e.preventDefault();
        this.sortHandler(el.dataset.sort);
        this.hideList();
      } else if (el.dataset.filter) {
        e.preventDefault();
        //this.filterHandler();
      } else {
        e.preventDefault();
        this.hideList();
      }
    });
  }

  showList(current) {
    const currentIsOpen = current.classList.contains('active')
    this.filterWrapper.forEach(wrapper => {
      wrapper.classList.remove('active');
    });

    if (!currentIsOpen) {
      current.classList.add('active');
    }
  }

  hideList() {
    this.filterWrapper.forEach(el => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      }
    });
  }
}

class Sort extends Filters {
  constructor(data) {
    super(data);
    return this.sort(data);
  }

  sortHandler(sortType) {
    window.localStorage.setItem('sort', sortType);
    this.sortType = sortType;
    app.render(this[sortType]());
  }

  asc() {
    const data = this.defData.slice();
    this.sortedData = data.sort((channelA, channelB) => {
      return channelA.name.toLowerCase() > channelB.name.toLowerCase() ? 1 : -1;
    });

    return this.sortedData;
  }

  desc() {
    const data = this.defData.slice();
    this.sortedData = data.sort((channelA, channelB) => {
      return channelA.name.toLowerCase() > channelB.name.toLowerCase() ? -1 : 1;
    });

    return this.sortedData;
  }

  def() {
    return this.defData;
  }

  sort(data) {
    if (data) {
      this.defData = data;
    }

    this.sortType = window.localStorage.getItem('sort') || this.sortType;
    return this[this.sortType]();
  }
}

export default Sort
