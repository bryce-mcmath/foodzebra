<template>
  <footer class="footer">
    <div class="footer-brand flex">
      <hr />
      <div class="brand"><span>food</span>zebra</div>
      <hr />
    </div>
    <section class="footer-content grid">
      <div class="location-contact flex">
        <h3 class="footer-header">Location and Contact</h3>
        <p>314 Delphi Street</p>
        <p>Victoria, BC V9A 4E6</p>
        <p>Contact Us | 888.888.8888</p>
      </div>
      <div class="mailing flex">
        <h3 class="footer-header">Join Our Mailing List</h3>
        <form action="#" class="flex">
          <input type="text" placeholder="Email Address" />
          <input type="submit" value="Sign Up" class="ui button" />
        </form>
      </div>
      <div class="follow flex">
        <h3 class="footer-header">Join Our Mailing List</h3>
        <div class="social flex">
          <i class="fab fa-instagram"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-facebook"></i>
        </div>
      </div>
    </section>
    <div class="copyright">
      &copy;2020 | Privacy Policy | Github
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data: function() {
    return {};
  }
};
</script>
