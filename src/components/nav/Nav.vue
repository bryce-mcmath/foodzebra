<template>
  <div>
    <div class="nav transparent"></div>
    <div class="nav visible">
      <div class="fl">
        <img class="nav-image logo" src="../../../public/foodzebralogo.PNG" />
        <img class="nav-image brand" src="../../../public/foodzebrabrand.PNG" />
      </div>
      <div class="fr">
        <sui-button primary>Primary</sui-button>
        <sui-button secondary>Secondary</sui-button>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      testText: "Hello?"
    };
  }
};
</script>
