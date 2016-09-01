<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

/**
 * Add font
 */
function valls_preprocess_page(&$vars, $hook) {
  drupal_add_js('//use.typekit.net/nwe1kps.js', 'external');
  if (!empty($vars['node']) && $vars['node']->type == 'work' && !empty($vars['node']->field_artist_name['und'][0]['value'])) {
    $artist = empty($vars['node']->field_artist_years['und'][0]['value']) ?
      $vars['node']->field_artist_name['und'][0]['value'] :
      $vars['node']->field_artist_name['und'][0]['value'] . ' ' . $vars['node']->field_artist_years['und'][0]['value'];

    $vars['title_prefix'] = '<div class="page-header artist">' . $artist . '</div>';
  }
}
