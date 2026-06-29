<?php
/**
 * Blog index template.
 *
 * @package HAFAT
 */

get_header();

$blog_title = is_home() && !is_front_page() ? single_post_title('', false) : __('Marketing systems insights', 'hafat');
$blog_intro = __('Practical notes on marketing operations, automation, content systems, analytics, and scalable growth.', 'hafat');
$post_index = 0;
?>

<main class="blog-index" id="top">
  <section class="blog-hero" aria-labelledby="blog-title">
    <div class="blog-shell">
      <?php hafat_rank_math_breadcrumbs(); ?>
      <p class="blog-kicker"><?php esc_html_e('HAFAT Blog', 'hafat'); ?></p>
      <h1 id="blog-title"><?php echo esc_html($blog_title); ?></h1>
      <p><?php echo esc_html($blog_intro); ?></p>
    </div>
  </section>

  <section class="blog-listing" aria-label="<?php esc_attr_e('Latest blog posts', 'hafat'); ?>">
    <div class="blog-shell">
      <?php if (have_posts()) : ?>
        <div class="blog-grid">
          <?php while (have_posts()) : the_post(); ?>
            <?php
            $post_index++;
            $is_featured = 1 === $post_index && !is_paged();
            $card_class = $is_featured ? 'blog-card blog-card--featured' : 'blog-card';
            ?>
            <article id="post-<?php the_ID(); ?>" class="<?php echo esc_attr($card_class); ?>">
              <a class="blog-card-link" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr(sprintf(__('Read %s', 'hafat'), get_the_title())); ?>">
                <?php if (has_post_thumbnail()) : ?>
                  <figure class="blog-card-media">
                    <?php the_post_thumbnail($is_featured ? 'large' : 'medium_large', ['loading' => $is_featured ? 'eager' : 'lazy']); ?>
                  </figure>
                <?php endif; ?>
                <div class="blog-card-copy">
                  <time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(hafat_post_meta_line()); ?></time>
                  <h2><?php the_title(); ?></h2>
                  <?php if (hafat_post_excerpt()) : ?>
                    <p><?php echo esc_html(hafat_post_excerpt(null, $is_featured ? 36 : 24)); ?></p>
                  <?php endif; ?>
                  <span class="blog-read-more"><?php esc_html_e('Read article', 'hafat'); ?></span>
                </div>
              </a>
            </article>
          <?php endwhile; ?>
        </div>

        <?php
        $pagination = paginate_links([
            'prev_text' => __('Newer posts', 'hafat'),
            'next_text' => __('Older posts', 'hafat'),
        ]);
        ?>

        <?php if ($pagination) : ?>
          <div class="blog-pagination" role="navigation" aria-label="<?php esc_attr_e('Blog pagination', 'hafat'); ?>">
            <?php echo wp_kses_post($pagination); ?>
          </div>
        <?php endif; ?>
      <?php else : ?>
        <div class="blog-empty">
          <h2><?php esc_html_e('No blog posts yet', 'hafat'); ?></h2>
          <p><?php esc_html_e('Publish the first post to start building the HAFAT knowledge base.', 'hafat'); ?></p>
        </div>
      <?php endif; ?>
    </div>
  </section>
</main>

<?php
get_footer();
