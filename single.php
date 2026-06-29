<?php
/**
 * Single post template.
 *
 * @package HAFAT
 */

get_header();
?>

<main class="single-post-view" id="top">
  <?php while (have_posts()) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" class="single-post-article">
      <header class="single-post-hero">
        <div class="blog-shell">
          <?php hafat_rank_math_breadcrumbs(); ?>
          <a class="blog-back-link" href="<?php echo esc_url(hafat_blog_page_url()); ?>"><?php esc_html_e('Back to blog', 'hafat'); ?></a>
          <time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(hafat_post_meta_line()); ?></time>
          <h1><?php the_title(); ?></h1>
          <?php if (hafat_post_excerpt(null, 32)) : ?>
            <p><?php echo esc_html(hafat_post_excerpt(null, 32)); ?></p>
          <?php endif; ?>
        </div>
      </header>

      <?php if (has_post_thumbnail()) : ?>
        <figure class="single-post-media">
          <?php the_post_thumbnail('large', ['loading' => 'eager']); ?>
        </figure>
      <?php endif; ?>

      <div class="single-post-content">
        <?php the_content(); ?>
      </div>

      <?php
      wp_link_pages([
          'before' => '<div class="single-post-pages">' . esc_html__('Pages:', 'hafat'),
          'after'  => '</div>',
      ]);
      ?>
    </article>

    <?php
    $recent_posts = new WP_Query([
        'post_type'           => 'post',
        'post_status'         => 'publish',
        'posts_per_page'      => 3,
        'post__not_in'        => [get_the_ID()],
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
    ]);
    ?>

    <?php if ($recent_posts->have_posts()) : ?>
      <aside class="related-posts" aria-labelledby="related-posts-title">
        <div class="blog-shell">
          <div class="related-posts-heading">
            <p class="blog-kicker"><?php esc_html_e('Keep reading', 'hafat'); ?></p>
            <h2 id="related-posts-title"><?php esc_html_e('More marketing systems insights', 'hafat'); ?></h2>
          </div>
          <div class="related-posts-grid">
            <?php while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
              <article id="post-<?php the_ID(); ?>" class="related-post-card">
                <a href="<?php the_permalink(); ?>">
                  <time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(hafat_post_meta_line()); ?></time>
                  <h3><?php the_title(); ?></h3>
                  <?php if (hafat_post_excerpt(null, 18)) : ?>
                    <p><?php echo esc_html(hafat_post_excerpt(null, 18)); ?></p>
                  <?php endif; ?>
                </a>
              </article>
            <?php endwhile; ?>
          </div>
        </div>
      </aside>
      <?php wp_reset_postdata(); ?>
    <?php endif; ?>
  <?php endwhile; ?>
</main>

<?php
get_footer();
