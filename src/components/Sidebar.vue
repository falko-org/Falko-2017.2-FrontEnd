<template>
  <div id="wrapper">
    <div id="sidebar-wrapper">
      <aside id="sidebar">
        <ul id="sidemenu" class="sidebar-nav">
          <li align="center">
            <router-link to="#">
              <a onclick="window.history.go(-1); return false;"  title="Return">
                <span class="sidebar-icon"><i class=" fa fa-arrow-left"></i></span>
                <span class="sidebar-title"></span>
              </a>
            </router-link>
          </li>
          <li align="center">
            <router-link to="/user">
              <a  title="User Profile">
                <span class="sidebar-icon"><i class=" fa fa-user-circle-o"></i></span>
                <span class="sidebar-title"></span>
              </a>
            </router-link>
          </li>
          <li align="center">
            <router-link to="/projects">
              <a  title="Projects">
                <span class="sidebar-icon"><i class=" fa fa-file"></i></span>
                <span class="sidebar-title"></span>
              </a>
            </router-link>
          </li>
          <li align="center">
            <router-link v-bind:to="'/projects/'+this.$route.params.id+'/releases'">
              <a  title="Releases" >
                <span v-if="this.$route.path == '/projects/'+this.$route.params.id ||
                this.$route.path == '/releases/'+this.$route.params.id ||
                this.$route.path == '/projects/'+this.$route.params.id+'/releases'"
                class="sidebar-icon"><i class=" fa fa-cube"></i></span>
                <span class="sidebar-title"></span>
              </a>
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>

export default {
};

</script>

<style>


#sidebar-wrapper {
  position: fixed;
  min-width: 4em;
  height: 100%;
  overflow-y: auto;
  background: #f8f9fa;
  border-right: solid;
  border-width: thin;
  border-color: #ddd;
  margin-right: 4em;
}

#sidebar-wrapper .sidebar-nav {
  font-size: 2em;
  list-style: none;
  padding: 0;
}

#sidebar-wrapper .sidebar-nav li {
  text-indent: 0;
  line-height: 1.8em;
}

.sidebar-nav li a {
  color: #3E5361;
}

</style>
