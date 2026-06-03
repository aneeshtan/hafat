<?php
/**
 * Site footer.
 *
 * @package HAFAT
 */
?>
    <footer class="site-footer">
      <div class="footer-identity">
        <a class="footer-brand" href="<?php echo esc_url(home_url('/')); ?>#top" aria-label="<?php esc_attr_e('HAFAT home', 'hafat'); ?>">
          <img class="footer-logo" src="<?php echo esc_url(hafat_asset('assets/brand/logo-white.png')); ?>" alt="<?php esc_attr_e('HAFAT', 'hafat'); ?>">
        </a>
        <p><?php esc_html_e('Dubai | Smart marketing, scalable growth, tailored systems', 'hafat'); ?></p>
      </div>
      <div class="footer-links">
        <div class="footer-group">
          <p class="footer-heading"><?php esc_html_e('Navigate', 'hafat'); ?></p>
          <nav class="footer-nav" aria-label="<?php esc_attr_e('Footer navigation', 'hafat'); ?>">
            <?php
            wp_nav_menu([
                'theme_location' => 'footer',
                'container'      => false,
                'items_wrap'     => '%3$s',
                'fallback_cb'    => 'hafat_menu_fallback',
                'depth'          => 1,
            ]);
            ?>
          </nav>
        </div>
        <div class="footer-group">
          <p class="footer-heading"><?php esc_html_e('Follow HAFAT', 'hafat'); ?></p>
          <div class="footer-social" aria-label="<?php esc_attr_e('Social media links', 'hafat'); ?>">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('Instagram', 'hafat'); ?>">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5"></rect>
                <circle cx="12" cy="12" r="4.1"></circle>
                <circle class="social-dot" cx="17.1" cy="6.9" r="1"></circle>
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('LinkedIn', 'hafat'); ?>">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle class="social-dot" cx="6.1" cy="6.4" r="1.35"></circle>
                <path d="M4.9 10.1v8.8"></path>
                <path d="M10 18.9v-8.8"></path>
                <path d="M10 13.8c.7-2.4 2.2-3.8 4.4-3.8 2.7 0 4.1 1.8 4.1 5.2v3.7"></path>
              </svg>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('TikTok', 'hafat'); ?>">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.2 4.3v10.3a4.1 4.1 0 1 1-3.2-4"></path>
                <path d="M12.2 4.3c.7 3.3 2.7 5.1 6 5.5"></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('Facebook', 'hafat'); ?>">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.2 20.2V12h2.8l.5-3h-3.3V7.4c0-1.1.6-1.7 1.9-1.7h1.5V3.1c-.7-.2-1.5-.3-2.4-.3-2.9 0-4.7 1.7-4.7 4.7V9H7.5v3H10v8.2"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    <?php wp_footer(); ?>
  </body>
</html>
