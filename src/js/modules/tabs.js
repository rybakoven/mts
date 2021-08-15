class Tabs {
  constructor() {
    this.currentTab = this.getCurrentTab();
    this.tabHeaders = document.querySelectorAll('.tab_wrapper .tab');
    this.tabContainers = document.querySelectorAll('.tab-content');
    this.addListener();
    this.show();
  }

  show() {
    this.tabHeaders.forEach((tab, index) => {
      tab.classList.remove('active');
      this.tabContainers[index].classList.remove('active');
    });

    let currentTab = this.getCurrentTab() - 1;
    this.tabHeaders[currentTab].classList.add('active');
    this.tabContainers[currentTab].classList.add('active');
  }

  getCurrentTab() {
    let currentTab = window.localStorage.getItem('currentTab');
    if (currentTab === null) {
      currentTab = 1;
      this.setCurrentTab(currentTab)
    }
    return currentTab;
  }

  setCurrentTab(index) {
    window.localStorage.setItem('currentTab', index);
  }

  addListener() {
    this.tabHeaders.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.setCurrentTab(e.target.dataset.tab)
        this.show();
      })
    });
  }
}

export default Tabs
