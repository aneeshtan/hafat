<?php
/**
 * Site header.
 *
 * @package HAFAT
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?php echo esc_attr__('HAFAT builds smart, scalable marketing systems that improve execution, consistency, efficiency, and growth.', 'hafat'); ?>">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <header class="site-header" data-header>
      <a class="brand" href="<?php echo esc_url(home_url('/')); ?>#top" aria-label="<?php esc_attr_e('HAFAT home', 'hafat'); ?>">
        <?php if (has_custom_logo()) : ?>
          <?php the_custom_logo(); ?>
        <?php else : ?>
          <img class="brand-logo" src="<?php echo esc_url(hafat_asset('assets/brand/logo-white.png')); ?>" alt="<?php esc_attr_e('HAFAT', 'hafat'); ?>">
        <?php endif; ?>
      </a>
      <nav aria-label="<?php esc_attr_e('Primary navigation', 'hafat'); ?>">
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'container'      => false,
            'items_wrap'     => '%3$s',
            'fallback_cb'    => 'hafat_menu_fallback',
            'depth'          => 1,
        ]);
        ?>
      </nav>
      <a class="pill" href="#contact"><?php esc_html_e('Book a session', 'hafat'); ?></a>
    </header>
