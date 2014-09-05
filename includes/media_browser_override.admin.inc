<?php 
/**
 * Page callback.
 */
function media_browser_override_admin_settings_form($form, $form_state) {
  $form = array(    
    'media_browser_override_default_wysiwyg_view_mode' => array(
      '#type' => 'checkbox',
      '#title' => t('Default to WYSIWYG Display Format?'),
      '#default_value' => variable_get('media_browser_override_default_wysiwyg_view_mode', 0),
      '#description' => t("Check this box if you want to default the inserted media view mode to the WYSIWYG view mode."),
    ),

    'media_browser_override_skip_view_mode_form' => array(
      '#type' => 'checkbox',
      '#title' => t('Skip View Mode Form?'),
      '#default_value' => variable_get('media_browser_override_skip_view_mode_form', 0),
      '#description' => t("Check this box if you want to skip the view mode form. Note: the default view mode will be used."),
    ),

    'media_browser_override_alter_plugin_js' => array(
      '#type' => 'checkbox',
      '#title' => t('Alter Media Browser Plugin JS code?'),
      '#default_value' => variable_get('media_browser_override_alter_plugin_js', 0),
      '#description' => t("Check this box if you want to alter the Media Browser Plugin JS code. This will allow the the selected text in the WYSIWYG to populate the insterted media link text."),
    ),

    'submit' => array( 
      '#type' => 'submit',
      '#value' => t('Save'),
    )
  );

  return $form;
}

/**
 * Submit callback for config form.
 */
function media_browser_override_admin_settings_form_submit($form, $form_state) {
  variable_set('media_browser_override_default_wysiwyg_view_mode',  $form_state['values']['media_browser_override_default_wysiwyg_view_mode']);
  variable_set('media_browser_override_skip_view_mode_form',  $form_state['values']['media_browser_override_skip_view_mode_form']);
  variable_set('media_browser_override_alter_plugin_js',  $form_state['values']['media_browser_override_alter_plugin_js']);

  drupal_set_message(t('Your configuration has been saved.'));
}