<?php
/**
 * HAFAT theme setup and assets.
 *
 * @package HAFAT
 */

if (!defined('ABSPATH')) {
    exit;
}

function hafat_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('custom-logo', [
        'height'      => 80,
        'width'       => 160,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    register_nav_menus([
        'primary' => __('Primary Navigation', 'hafat'),
        'footer'  => __('Footer Navigation', 'hafat'),
    ]);
}
add_action('after_setup_theme', 'hafat_setup');

function hafat_asset(string $path): string
{
    return get_template_directory_uri() . '/' . ltrim($path, '/');
}

function hafat_enqueue_assets(): void
{
    wp_enqueue_style(
        'hafat-fonts',
        'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Noto+Sans:wght@400;500;600;700;800&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'hafat-site',
        hafat_asset('css/styles.css'),
        ['hafat-fonts'],
        '1.0.0'
    );

    wp_enqueue_script(
        'gsap',
        'https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js',
        [],
        '3.12.7',
        true
    );

    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js',
        ['gsap'],
        '3.12.7',
        true
    );

    wp_enqueue_script(
        'hafat-site',
        hafat_asset('js/script.js'),
        ['gsap', 'gsap-scrolltrigger'],
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'hafat_enqueue_assets');

function hafat_menu_fallback(): void
{
    ?>
    <a href="#about"><?php esc_html_e('About', 'hafat'); ?></a>
    <a href="#services"><?php esc_html_e('Solutions', 'hafat'); ?></a>
    <a href="#work"><?php esc_html_e('Proof', 'hafat'); ?></a>
    <a href="#contact"><?php esc_html_e('Contact', 'hafat'); ?></a>
    <?php
}
