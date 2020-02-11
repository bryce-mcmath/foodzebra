<template>
  <footer id="footer" class="footer flex">
    <div class="footer-brand flex">
      <hr />
      <div class="brand">
        <span>food</span>zebra
      </div>
      <hr />
    </div>
    <section class="footer-content grid">
      <div class="location-contact flex">
        <h3 class="footer-header">Location and Contact</h3>
        <p>314 Delphi Street</p>
        <p>Victoria, BC V9A 4E6</p>
        <p>Contact Us | 888.888.8888</p>
        <p>hello@foodzebra.co.uk</p>
      </div>
      <div class="mailing flex">
        <h3 class="footer-header">Join Our Mailing List</h3>
        <form action="#" class="flex ui form">
          <div class="ui input">
            <input type="text" placeholder="Email Address" />
          </div>
          <input type="submit" value="Sign Up" class="ui button" />
        </form>
      </div>
      <div class="follow flex">
        <h3 class="footer-header">Follow Us</h3>
        <div class="social flex">
          <div class="insta flex">
            <i class="fab fa-instagram fa-2x"></i>
          </div>
          <div class="twitter flex">
            <i class="fab fa-twitter fa-2x"></i>
          </div>
          <div class="facebook flex">
            <i class="fab fa-facebook-f fa-2x"></i>
          </div>
        </div>
      </div>
    </section>
    <div class="copyright">
      &copy;2020 |
      <span>Privacy Policy</span> |
      <span>
        <a href="https://github.com/bryce-mcmath/foodzebra">Github</a>
      </span> |
      <span>Log In As Operator</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: function() {
    return {};
  }
};
</script>
