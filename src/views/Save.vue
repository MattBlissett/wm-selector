https://wm-selector.github.io/#/?4=1&8=1&9=1&10=1&jsonPath=warmaster-armies%2Flizardmen&label=&printItems=

https://mattblissett.github.io/wm-selector/#/?3=1&7=1&10=1&jsonPath=json%2Fwarmaster-armies%2Fempire&label=&printItems=

<template>
  <main class="save-view">
    <p>The following URL can be used to restore the current list:</p>

    <textarea readonly v-html="url()" @focus="$event.target.select()"></textarea>

    <p>And this URL can be used to export the current list to the main Warmaster Army Selector site, <em>but only if the lists used are similar between both sites</em>:</p>

    <textarea readonly v-html="exporturl()" @focus="$event.target.select()"></textarea>
  </main>
</template>

<script>
import Querystring from 'querystring-es3';

import store from '@/store';

export default {
  name: 'SaveView',
  methods: {
    url: () => window.location.origin + window.location.pathname + '#/?' + Querystring.stringify(Object.keys(store.getters.usedUnits)
      .reduce((url, unitID) => {
        var unit = store.getters.usedUnits[unitID];

        url[unit.order] = unit.number;

        for (var upgradeID in unit.upgrades) {
          url[unit.order + '-' + store.getters.upgrades[upgradeID].order] = unit.upgrades[upgradeID].number;
        }

        return url;
      }, {
        jsonPath: store.getters.jsonPath.replace('json/', ''),
        label: store.getters.label,
        printItems: store.getters.printItems.map((printItem) => printItem.abbr).join(',')
      })),

    exporturl: () => 'https://wm-selector.github.io/#/?' + Querystring.stringify(Object.keys(store.getters.usedUnits)
      .reduce((url, unitID) => {
        var unit = store.getters.usedUnits[unitID];

        url[unit.order] = unit.number;

        for (var upgradeID in unit.upgrades) {
          url[unit.order + '-' + store.getters.upgrades[upgradeID].order] = unit.upgrades[upgradeID].number;
        }

        return url;
      }, {
        jsonPath: store.getters.jsonPath.replace('json/', ''),
        label: store.getters.label,
        printItems: store.getters.printItems.map((printItem) => printItem.abbr).join(',')
      }))
  }
};
</script>

<style lang="scss">
  .save-view {
  }
</style>
