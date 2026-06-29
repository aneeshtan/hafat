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

function hafat_reading_time(?int $post_id = null): string
{
    $post_id = $post_id ?: get_the_ID();
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(wp_strip_all_tags((string) $content));
    $minutes = max(1, (int) ceil($word_count / 220));

    return sprintf(
        /* translators: %d: estimated reading time in minutes. */
        _n('%d min read', '%d min read', $minutes, 'hafat'),
        $minutes
    );
}

function hafat_post_excerpt(?int $post_id = null, int $word_limit = 26): string
{
    $post_id = $post_id ?: get_the_ID();
    $excerpt = has_excerpt($post_id)
        ? get_the_excerpt($post_id)
        : wp_trim_words(wp_strip_all_tags(get_post_field('post_content', $post_id)), $word_limit);

    return trim($excerpt);
}

function hafat_post_meta_line(?int $post_id = null): string
{
    $post_id = $post_id ?: get_the_ID();
    $published = get_the_date('', $post_id);
    $updated = get_the_modified_date('', $post_id);
    $parts = [$published, hafat_reading_time($post_id)];

    if ($updated && $updated !== $published) {
        $parts[] = sprintf(
            /* translators: %s: modified post date. */
            __('Updated %s', 'hafat'),
            $updated
        );
    }

    return implode(' / ', array_filter($parts));
}

function hafat_blog_page_url(): string
{
    $posts_page_id = (int) get_option('page_for_posts');

    if ($posts_page_id > 0) {
        return get_permalink($posts_page_id);
    }

    return home_url('/');
}

function hafat_rank_math_breadcrumbs(): void
{
    if (!function_exists('rank_math_the_breadcrumbs')) {
        return;
    }

    echo '<div class="seo-breadcrumbs">';
    rank_math_the_breadcrumbs();
    echo '</div>';
}

function hafat_menu_fallback(): void
{
    ?>
    <a href="<?php echo esc_url(home_url('/#about')); ?>"><?php esc_html_e('About', 'hafat'); ?></a>
    <a href="<?php echo esc_url(home_url('/#services')); ?>"><?php esc_html_e('Solutions', 'hafat'); ?></a>
    <a href="<?php echo esc_url(home_url('/#work')); ?>"><?php esc_html_e('Proof', 'hafat'); ?></a>
    <a href="<?php echo esc_url(hafat_blog_page_url()); ?>"><?php esc_html_e('Blog', 'hafat'); ?></a>
    <a href="<?php echo esc_url(home_url('/#contact')); ?>"><?php esc_html_e('Contact', 'hafat'); ?></a>
    <?php
}
