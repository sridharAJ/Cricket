/**
 * Created by 12072 on 20/03/17.
 */

function LocalStorage() {
    if (typeof window.localStorage != "undefined") {
        this.localStorage = localStorage;
    }
}

LocalStorage.prototype.getItem = function(key) {
    return this.localStorage.getItem(key);
};

LocalStorage.prototype.set = function(key, value) {
    this.localStorage.setItem(key, value);
};

export default LocalStorage;