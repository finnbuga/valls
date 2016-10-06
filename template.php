<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

/**
 * hook_preprocess_page()
 */
function valls_preprocess_page(&$vars, $hook) {
  _valls_add_font();

  if (!empty($vars['node']) && $vars['node']->type == 'work') {
    _valls_alter_work_title($vars);
  }
}

/**
 * Add artist data to the Artwork title
 */
function _valls_alter_work_title(&$vars) {
  if (!empty($vars['node']->field_artist_name['und'][0]['value'])) {
    $vars['title_prefix'] = '<div class="page-header artist">';
    $vars['title_prefix'] .= '<div class="artist-name">' . $vars['node']->field_artist_name['und'][0]['value'] . '</div>';

    if (!empty($vars['node']->field_artist_years['und'][0]['value'])) {
      $vars['title_prefix'] .= '<div class="artist-years">' . $vars['node']->field_artist_years['und'][0]['value'] . '</div>';
    }

    $vars['title_prefix'] .= '</div>';
  }
}

/**
 * Add font
 */
function _valls_add_font() {
  drupal_add_js('//use.typekit.net/nwe1kps.js', 'external');
}
