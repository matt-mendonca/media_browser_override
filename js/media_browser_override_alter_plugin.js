/**
 * Altering some parts of wysiwyg-media.js from Media 2.x
 */
;(function ($) {
  Drupal.behaviors.mediaBrowserOverrideAlterPlugin = {
    attach: function (context, settings) {
      //Hacky, creating a global object to throw crap into
      window.mediaBrowserAlterPlugin = {
        data: null
      };

      /**
       * Overriding the media browser invoke function to be able to use the 
       * selected text from the wysiwyg to populate the inserted media 
       * link text
       */
      if(Drupal.wysiwyg && Drupal.wysiwyg.plugins.media) {
        Drupal.wysiwyg.plugins.media.invoke = function (data, settings, instanceId) {
          
          /**** ALTER ****/
          /* + */ mediaBrowserAlterPlugin.data = data;
          /**** /ALTER ****/

          if (data.format == 'html') {
            var insert = new InsertMedia(instanceId);
            if (this.isNode(data.node)) {
              // Change the view mode for already-inserted media.
              var media_file = Drupal.media.filter.extract_file_info($(data.node));
              insert.onSelect([media_file]);
            }
            else {
              // Insert new media.
              insert.prompt(settings.global);
            }
          }
        };  
      }
      

      /**
       * Defining InsertMedia object to manage the sequence of actions involved in
       * inserting a media element into the WYSIWYG.
       * Keeps track of the WYSIWYG instance id.
       */
      var InsertMedia = function (instance_id) {
        this.instanceId = instance_id;
        return this;
      };

      InsertMedia.prototype = {
        /**
         * Prompt user to select a media item with the media browser.
         *
         * @param settings
         *    Settings object to pass on to the media browser.
         *    TODO: Determine if this is actually necessary.
         */
        prompt: function (settings) {
          Drupal.media.popups.mediaBrowser($.proxy(this, 'onSelect'), settings);
        },

        /**
         * On selection of a media item, display item's display configuration form.
         */
        onSelect: function (media_files) {
          this.mediaFile = media_files[0];
          Drupal.media.popups.mediaStyleSelector(this.mediaFile, $.proxy(this, 'insert'), {});
        },

        /**
         * When display config has been set, insert the placeholder markup into the
         * wysiwyg and generate its corresponding json macro pair to be added to the
         * tagmap.
         */
        insert: function (formatted_media) {
          var element = Drupal.media.filter.create_element(formatted_media.html, {
                fid: this.mediaFile.fid,
                view_mode: formatted_media.type,
                attributes: formatted_media.options,
                fields: formatted_media.options
              });

          /**** ALTER ****/
          /* + */ if(mediaBrowserAlterPlugin.data.content) {
          /* + */   $(element).find('a').text(mediaBrowserAlterPlugin.data.content);
          /* + */ }
          /**** /ALTER ****/

          // Get the markup and register it for the macro / placeholder handling.
          var markup = Drupal.media.filter.getWysiwygHTML(element);

          // Insert placeholder markup into wysiwyg.
          Drupal.wysiwyg.instances[this.instanceId].insert(markup);
        }
      };
    }
  }
})(jQuery);