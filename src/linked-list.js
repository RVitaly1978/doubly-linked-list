const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;    
    }

    append(data) {
        let node = new Node(data);

        if (this.length !== 0) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }

        this.length++;
        return this;
    }
    
    head() {
        if (this._head === null) {
            return null;
        } else {
            return this._head.data;
        }
    }
    
    tail() {
        if (this._tail === null) {
            return null;
        } else {
            return this._tail.data;
        }
    }

    at(index) {
        let current_node = this._head;
        let current_index = 0;

        while (index > 0 && current_index < index) {
            current_node = current_node.next;
            current_index++
        }

        return current_node.data;
    }

    insertAt(index, data) {
        let current_node = this._head;
        let current_index = 0;
        let previous_index_node = null;
        let insert_node = new Node(data);

        if (index === 0 && this.length === 0) {
            this._head = insert_node;
            this._tail = insert_node;

        } else if (index === 0) {
            insert_node.next = current_node;
            current_node.prev = insert_node;
            this._head = insert_node;

        } else {

            while (index > 0 && current_index < index) {
                current_node = current_node.next;
                current_index++;
            }
            
            previous_index_node = current_node.prev; 
            insert_node.prev = previous_index_node;
            insert_node.next = current_node;
            previous_index_node.next = insert_node;
            current_node.prev = insert_node;
        }

        this.length++
        return this;
    }

    isEmpty() {
        if (this.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let current_index = 0;
        let current_node = this._head;
        let previous_index_node = null;
        let next_index_node = null;

        if (index === 0 && this.length === 1) {
            this._head = null;
            this._tail = null;
            this.length = 0;

            return this;

        } else if (index === 0) {
            this._head = current_node.next;
            this._head.prev = null;

        } else if (index === (this.length - 1)) {
            this._tail = this.tail.prev;
            this._tail.next = null;

        } else {

            while (current_index < index) {
                current_node = current_node.next;
                current_index++;
            }

            previous_index_node = current_node.prev;
            next_index_node = current_node.next;
            previous_index_node.next = next_index_node;
            next_index_node.prev = previous_index_node;
            current_node = null;

        }

        this.length--
        return this;
    }

    reverse() {
        let current_index = 0;
        let current_node = this._head;
        let current_node_acc = null;

        while (current_index < this.length) {
            current_node_acc = current_node.next;
            current_node.next = current_node.prev;
            current_node.prev = current_node_acc;
            current_node = current_node_acc;
            current_index++;
        }
        
        current_node_acc = this._tail;
        this._tail = this._head;
        this._head = current_node_acc;

        return this;
    }

    indexOf(data) {
        let current_node = this._head;

        for (let current_index = 0; current_index < this.length; current_index++) {
            if (current_node.data !== data) {
                current_node = current_node.next;
            } else {
                return current_index;
            }
        }

        return -1;
    }
}

module.exports = LinkedList;
