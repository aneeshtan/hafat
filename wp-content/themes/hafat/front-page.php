<?php
/**
 * Front page template.
 *
 * @package HAFAT
 */

get_header();

$why_items = [
    [
        'class' => 'one',
        'title' => 'Reduce manual processes',
        'copy'  => 'Streamlined workflows that improve speed, consistency, and execution.',
        'image' => 'assets/images/why-hafat/reduce-manual-process.jpg',
    ],
    [
        'class' => 'two',
        'title' => 'Improve execution speed',
        'copy'  => 'Faster delivery systems that help teams move from planning to publishing with fewer delays.',
        'image' => 'assets/images/why-hafat/improve-execution-speed.png',
    ],
    [
        'class' => 'three',
        'title' => 'Scale operations efficiently',
        'copy'  => 'Connected systems that support growth without adding unnecessary complexity.',
        'image' => 'assets/images/why-hafat/scale-operations.png',
    ],
    [
        'class' => 'four',
        'title' => 'Optimise with data',
        'copy'  => 'Clearer reporting and insight loops that help teams make better marketing decisions.',
        'image' => 'assets/images/why-hafat/optimise-data.png',
    ],
];

$services = [
    [
        'label' => 'Strategy and Planning',
        'title' => 'Marketing strategies aligned with business goals and audience behaviour.',
        'copy'  => 'Tailored marketing strategies designed around business priorities, audience behaviour, and the operational gaps slowing growth.',
        'image' => 'assets/images/services/strategy-and-planning.jpg',
    ],
    [
        'label' => 'Automation and Systems',
        'title' => 'Workflow automation, content systems, and operational optimisation.',
        'copy'  => 'Streamlined workflows that reduce manual processes, improve delivery speed, and make marketing operations easier to scale.',
        'image' => 'assets/images/services/automation-and-systems.png',
    ],
    [
        'label' => 'Content and Creative',
        'title' => 'Scalable content production and brand-focused creative execution.',
        'copy'  => 'Content and creative systems that improve brand consistency, speed up production, and support campaign output with fewer bottlenecks.',
        'image' => 'assets/images/services/content-and-creative.png',
    ],
    [
        'label' => 'Social Media Management',
        'title' => 'Platform-specific strategies designed to improve engagement and visibility.',
        'copy'  => 'Platform-specific content, planning, and publishing systems that help teams maintain consistency and grow engagement.',
        'image' => 'assets/images/services/social-media-management.png',
    ],
    [
        'label' => 'Performance and Analytics',
        'title' => 'Data tracking, reporting, and optimisation for continuous improvement.',
        'copy'  => 'Integrated tracking and reporting systems that improve visibility, support faster decisions, and turn performance insights into better outcomes.',
        'image' => 'assets/images/services/performance-and-analytics.jpg',
    ],
    [
        'label' => 'Value and Cost Optimisation',
        'title' => 'Reduced operational costs while improving performance and ROI.',
        'copy'  => 'Resource optimisation, smarter systems, and connected workflows that reduce operational costs while improving performance.',
        'image' => 'assets/images/services/value-and-cost-optimisation.png',
    ],
];

$clients = [
    ['name' => 'Gulftainer', 'image' => 'assets/clients/gulftainer-crop.png'],
    ['name' => 'DFreight', 'image' => 'assets/clients/dfreight-clean.png'],
    ['name' => 'Wonderfruit', 'image' => 'assets/clients/wonderfruit-logo.svg'],
    ['name' => 'Green Box Containers', 'image' => 'assets/clients/greenbox-crop.png'],
];

$certifications = [
    ['name' => 'Google Ads certification', 'image' => 'assets/certifications/google-ads.png'],
    ['name' => 'Google Analytics certification', 'image' => 'assets/certifications/google-analytics.png'],
    ['name' => 'Google Tag Management certification', 'image' => 'assets/certifications/google-tag-manager.png'],
    ['name' => 'HubSpot certification', 'image' => 'assets/certifications/hubspot.png'],
    ['name' => 'LinkedIn Ads certification', 'image' => 'assets/certifications/linkedin-ads.png'],
];
?>

<main id="top">
  <section class="hero panel" data-hero>
    <div class="hero-frame" data-hero-frame>
      <video class="hero-video" autoplay loop muted playsinline preload="auto">
        <source src="<?php echo esc_url(hafat_asset('assets/video/hero.mp4')); ?>" type="video/mp4">
      </video>
      <div class="noise-overlay" aria-hidden="true" data-hero-noise></div>
      <div class="hero-gradient" aria-hidden="true" data-hero-gradient></div>
      <div class="hero-copy" data-hero-copy>
        <div class="hero-grid" data-hero-grid>
          <div>
            <h1 class="hero-title" data-pullup>
              <span data-hero-title><?php esc_html_e('Scale smarter with HAFAT', 'hafat'); ?></span>
            </h1>
            <p class="lead" data-hero-lead><?php esc_html_e('HAFAT simplifies marketing operations through smart, scalable solutions that improve execution, consistency, efficiency and measurable growth.', 'hafat'); ?></p>
          </div>
          <div class="hero-side" data-hero-side>
            <div class="hero-actions" data-hero-actions>
              <a class="button primary" href="#contact"><?php esc_html_e('Streamline your marketing', 'hafat'); ?> <span class="button-icon" aria-hidden="true">→</span></a>
              <a class="button ghost" href="#services"><?php esc_html_e('Explore services', 'hafat'); ?></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="membrane" id="about" data-membrane aria-label="<?php esc_attr_e('Interactive membrane section', 'hafat'); ?>">
    <canvas class="membrane-canvas" data-membrane-canvas aria-hidden="true"></canvas>
    <div class="membrane-content">
      <h2 class="membrane-title membrane-title--media" data-reveal>
        <span class="membrane-title-line">
          <span><?php esc_html_e('Building', 'hafat'); ?></span>
          <i class="membrane-gif-slot membrane-gif-slot--one" aria-hidden="true">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzMyNXkzZHRvdnR6ZzJ0NGt6MHRpdTNpbTY2NjFxN3k5Y3N3NjR6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d3mlE7uhX8KFgEmY/giphy.gif" alt="" loading="lazy">
          </i>
          <span><?php esc_html_e('smarter', 'hafat'); ?></span>
        </span>
        <span class="membrane-title-line">
          <span><?php esc_html_e('marketing', 'hafat'); ?></span>
          <i class="membrane-gif-slot membrane-gif-slot--two" aria-hidden="true">
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmw5YXpqY3J4MDR6NG5sN2tmcjloc3J4Y2JuOTlzcGljeHVhNGVtbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/111ebonMs90YLu/giphy.gif" alt="" loading="lazy">
          </i>
          <span><?php esc_html_e('systems', 'hafat'); ?></span>
        </span>
        <span class="membrane-title-line">
          <span><?php esc_html_e('for', 'hafat'); ?></span>
          <i class="membrane-gif-slot membrane-gif-slot--three" aria-hidden="true">
            <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGJmeDdjcmtuajh1NzAzeWF5MGw4cXoyNXd1OW5oeWVmYjNhZmxzNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fV8BLpra1VV3q/giphy.gif" alt="" loading="lazy">
          </i>
          <span><?php esc_html_e('modern', 'hafat'); ?></span>
          <i class="membrane-gif-slot membrane-gif-slot--four" aria-hidden="true">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY295cmYyaDBtenF3b3U2YXEyYmN0YWYyaXY3bHRjYWhkcXc0M2wzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/20Mr9uJLkWfqWDs6Ul/giphy.gif" alt="" loading="lazy">
          </i>
          <span><?php esc_html_e('businesses', 'hafat'); ?></span>
        </span>
      </h2>
      <p class="membrane-subtitle" data-reveal>
        <span><?php esc_html_e('A dynamic, solution-oriented team built for modern marketing complexity,', 'hafat'); ?></span>
        <span><?php esc_html_e('combining industry awareness, technology-savvy thinking, and sound judgment', 'hafat'); ?></span>
        <span><?php esc_html_e('to deliver clarity, efficiency, and scalable execution.', 'hafat'); ?></span>
      </p>
    </div>
  </section>

  <section class="why-hafat-scroll" id="work" aria-label="<?php esc_attr_e('Why HAFAT', 'hafat'); ?>">
    <?php foreach ($why_items as $index => $item) : ?>
      <article class="why-panel why-panel--<?php echo esc_attr($item['class']); ?>">
        <div class="why-panel-copy">
          <p class="why-kicker"><?php esc_html_e('Why HAFAT', 'hafat'); ?></p>
          <h2><?php echo esc_html($item['title']); ?></h2>
          <p><?php echo esc_html($item['copy']); ?></p>
        </div>
        <figure class="why-panel-media">
          <img src="<?php echo esc_url(hafat_asset($item['image'])); ?>" alt="<?php echo esc_attr($item['title']); ?>">
        </figure>
      </article>
    <?php endforeach; ?>
  </section>

  <section class="services" id="services" aria-labelledby="services-title" data-services-gallery>
    <div class="services-slides">
      <?php foreach ($services as $index => $service) : ?>
        <article class="service-visual<?php echo 0 === $index ? ' is-active' : ''; ?>" data-service-visual data-service-index="<?php echo esc_attr($index); ?>" style="--service-image: url('<?php echo esc_url(hafat_asset($service['image'])); ?>')">
          <div class="service-slide-copy">
            <p><?php echo esc_html($service['label']); ?></p>
            <h3><?php echo esc_html($service['title']); ?></h3>
            <span><?php echo esc_html($service['copy']); ?></span>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
    <div class="services-inner">
      <h2 class="services-label reveal" id="services-title">
        <span><?php esc_html_e('Marketing Solutions', 'hafat'); ?></span>
        <span><?php esc_html_e('Designed for Growth', 'hafat'); ?></span>
      </h2>
      <div class="services-controls reveal" aria-label="<?php esc_attr_e('Slider controls', 'hafat'); ?>">
        <button type="button" data-service-prev aria-label="<?php esc_attr_e('Previous service', 'hafat'); ?>">←</button>
        <button type="button" data-service-next aria-label="<?php esc_attr_e('Next service', 'hafat'); ?>">→</button>
      </div>
    </div>
  </section>

  <section class="testimonial panel" id="clients" aria-label="<?php esc_attr_e('Working clients', 'hafat'); ?>">
    <div class="clients-header reveal">
      <h2 data-clients-heading>
        <span data-clients-word><?php esc_html_e('Brands', 'hafat'); ?></span>
        <span data-clients-word><?php esc_html_e('scaling', 'hafat'); ?></span>
        <span data-clients-word><?php esc_html_e('smarter', 'hafat'); ?></span>
        <span data-clients-word><?php esc_html_e('with us', 'hafat'); ?></span>
      </h2>
    </div>
    <div class="client-logo-band reveal" aria-label="<?php esc_attr_e('Client logos', 'hafat'); ?>">
      <div class="client-logo-track">
        <?php foreach (array_merge($clients, $clients) as $index => $client) : ?>
          <div class="client-logo-cell"<?php echo $index >= count($clients) ? ' aria-hidden="true"' : ''; ?>>
            <img src="<?php echo esc_url(hafat_asset($client['image'])); ?>" alt="<?php echo $index >= count($clients) ? '' : esc_attr($client['name']); ?>">
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="certifications panel" id="certifications" aria-label="<?php esc_attr_e('Certifications and platforms', 'hafat'); ?>">
    <div class="cert-shell reveal">
      <div class="cert-copy">
        <h1><?php esc_html_e('Certifications', 'hafat'); ?></h1>
        <p><?php esc_html_e('Our model combines multi-platform expertise, analytics discipline, automation knowledge, and campaign experience across the tools modern businesses rely on.', 'hafat'); ?></p>
      </div>
      <div class="cert-grid" aria-label="<?php esc_attr_e('Certification logos', 'hafat'); ?>">
        <?php foreach ($certifications as $certification) : ?>
          <article>
            <img src="<?php echo esc_url(hafat_asset($certification['image'])); ?>" alt="<?php echo esc_attr($certification['name']); ?>">
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="contact panel" id="contact">
    <div class="contact-card reveal">
      <div class="contact-visual" aria-hidden="true">
        <div class="contact-visual-copy">
          <p><?php esc_html_e('Ready to streamline your marketing?', 'hafat'); ?></p>
          <h3><?php esc_html_e('Tell us where your brand needs momentum.', 'hafat'); ?></h3>
        </div>
      </div>
      <div class="contact-content">
        <div class="contact-copy">
          <h2><?php esc_html_e('Contact Us', 'hafat'); ?></h2>
          <p><?php esc_html_e('Share the challenge, the markets, and the workflows you want to improve. We will review it and come back with a focused next step.', 'hafat'); ?></p>
        </div>
        <form class="contact-form" data-contact-form novalidate>
          <div class="form-row">
            <label>
              <span><?php esc_html_e('Name', 'hafat'); ?></span>
              <input name="name" type="text" autocomplete="name" required>
            </label>
            <label>
              <span><?php esc_html_e('Email', 'hafat'); ?></span>
              <input name="email" type="email" autocomplete="email" required>
            </label>
          </div>
          <div class="form-row">
            <label>
              <span><?php esc_html_e('Company', 'hafat'); ?></span>
              <input name="company" type="text" autocomplete="organization">
            </label>
            <label>
              <span><?php esc_html_e('Priority', 'hafat'); ?></span>
              <select name="priority" required>
                <option value=""><?php esc_html_e('Choose one', 'hafat'); ?></option>
                <option><?php esc_html_e('Strategy and planning', 'hafat'); ?></option>
                <option><?php esc_html_e('Automation and systems', 'hafat'); ?></option>
                <option><?php esc_html_e('Content and creative', 'hafat'); ?></option>
                <option><?php esc_html_e('Social media management', 'hafat'); ?></option>
                <option><?php esc_html_e('Performance and analytics', 'hafat'); ?></option>
                <option><?php esc_html_e('Cost optimisation', 'hafat'); ?></option>
              </select>
            </label>
          </div>
          <label>
            <span><?php esc_html_e('What should we streamline?', 'hafat'); ?></span>
            <textarea name="message" rows="5" required></textarea>
          </label>
          <div class="form-footer">
            <p data-form-status><?php esc_html_e('Local preview only. This form is not connected yet.', 'hafat'); ?></p>
            <button class="button primary" type="submit"><?php esc_html_e('Start smarter growth', 'hafat'); ?> <span class="button-icon" aria-hidden="true">→</span></button>
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

<?php
get_footer();
