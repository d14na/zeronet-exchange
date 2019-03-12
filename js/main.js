class ZeroApp extends ZeroApi {
    setSiteInfo(_siteInfo) {
        /* Set Zer0net summary details. */
        App.ziteAddress = _siteInfo.address
        App.zitePeers = _siteInfo.peers
        App.ziteSize = _siteInfo.settings.size
    }

    onOpen() {
        /* Call super. */
        super.onOpen()

        this.cmd('siteInfo', [], function (_siteInfo) {
            Zero.setSiteInfo(_siteInfo)
        })
    }

    onEvent(_event, _message) {
        if (_event === 'setSiteInfo') {
            this.setSiteInfo(_message.params)
        } else {
            this._log('Unknown event:', _event)
        }
    }
}

/**
 * Vue Application Manager (Configuration)
 */
const vueAppManager = {
    el: '#app',
    data: () => ({
        /* ZeroApp / ZeroApi Manager */
        zero: null,

        /* App Summary */
        appTitle: 'ZeroDelta',
        appDesc: 'The Official ZeroCache (DEX) Decentralized Exchange',

        /* Zite Summary */
        ziteAddress: 'n/a',
        zitePeers: 0,
        ziteSize: 0
    }),
    mounted: function () {
        /* Initialize application. */
        this._init()
    },
    computed: {
        // TODO
    },
    methods: {
        _init: function () {
            /* Initialize new Zer0net app manager. */
            // NOTE Globally accessible (e.g. Zero.cmd(...))
            window.Zero = new ZeroApp()

            console.info('App.() & Zero.() have loaded successfully!')
        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)
