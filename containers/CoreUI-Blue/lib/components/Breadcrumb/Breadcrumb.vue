<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" :key="index" v-for="(routeObject, index) in routeRecords">
      <span class="active" v-if="isLast(index)">{{ getName(routeObject) }}</span>
      <router-link :to="routeObject" v-else>{{ getName(routeObject) }}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    routeRecords: function () {
      return this.list.filter((route) => route.name || route.path)
    }
  },
  methods: {
    getName (item) {
      let regex = /_\(\'*(.*)\'\)/;
      let name = item.name || item.path;
      if (!name) return name;
      let matches = name.match(regex);
      if (!matches || matches.length < 2) return name;
      return this._(matches[1]);
    },
    isLast (index) {
      return index === this.list.length - 1
    }
  }
}
</script>
