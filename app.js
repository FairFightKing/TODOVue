Vue.component('task',{
    props : {
        name: String,
        status: {
            type: Boolean,
            default: false
        },
    },
    template:
    `
    <div class="view">
        <input type="checkbox" class="toggle" :checked="this.status === false ? '' : 'checked'" @change="check">
        <label>{{name}}</label>
        <button class="destroy" @click="suppress"></button>
    </div>
`,
    methods: {
        suppress () {
            this.$emit('suppress')
        },
        check () {
            this.$emit('check')
        }
    },
    computed: {
    }
});

Vue.component('filterrow',{
    props : {
        name: String,
        status: {
            type: Boolean,
            default: false
        },
    },
    template:
        `
        <a href="#" 
        :class="this.status === false ? '' : 'selected'"
        @click="activate"
        >{{ name }}</a>
`,
    methods: {
        activate (e) {
            let value = e.target.className;
            if(value === ''){
                this.$emit('activate', this.name);
                e.target.className = 'selected'
            }
        },
    },
    computed: {
    }
});


let V = new Vue({
    el: '#app',
    data: {
        tasks : [
            {name: 'xd', status : false},
            {name: 'lol', status : true},
            {name: 'mdr', status : true},
            {name: 'xptdr', status : false},
        ],
        show : 'all',
        filters : [
            {name: 'all', status: true},
            {name: 'todo', status: false},
            {name: 'done', status: false}
        ],
        hasBeenCleared : false
    },
    methods: {
        addNewTask (e) {
            let name = e.target.value;
            this.tasks.push({name: name , status : false});
            e.target.value = ''
        },
        activated (e) {
            this.filters.forEach((elem) => {
                elem.status = false;
                if(elem.name === e){
                    elem.status = true;
                }
                this.show = e;
            })
        },
        clearCompleted () {
            for(let i = 0;i < this.tasks.length; i++) {
                if (this.tasks[i].status === true){
                    this.tasks.splice(i, 1);
                    i--;
                }
            }
        },
        markAllAsComplete () {
            if(!this.hasBeenCleared){
                this.tasks.forEach((elem) => {
                    elem.status = true;
                });
                this.hasBeenCleared = true;
            } else {
                if (!this.hasCompleted){
                    this.tasks.forEach((elem) => {
                        elem.status = true;
                    })
                } else {
                    this.tasks.forEach((elem) => {
                        elem.status = false;
                    })
                }
            }
        }
    },
    computed: {
        taskNb () {
            let total = 0;
            this.tasks.forEach((calc) => {
                if(calc.status === false) {
                    total ++;
                }
            });
            return total
        },
        hasCompleted ()  {
            for(let i = 0;i < this.tasks.length; i++) {
                if (this.tasks[i].status === true){
                    return true
                }
            }
            return false
        },
        allTaskCompleted (){
            for(let i = 0;i < this.tasks.length; i++) {
                if (this.tasks[i].status === true){
                    return false
                }
            }
            return true
        }
    }
});