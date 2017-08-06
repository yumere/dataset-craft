const acorn = require('acorn');

var str = `
applyStemExtensions: function(){
      var first_note = this.notes[0];
      var first_y_px = first_note.getStemExtents().topY;
      var first_x_px = first_note.getStemX();

      for (var i = 0; i < this.notes.length; ++i) {
        var note = this.notes[i];

        var x_px = note.getStemX();
        var y_extents = note.getStemExtents();
        var base_y_px = y_extents.baseY;
        var top_y_px = y_extents.topY;

        // For harmonic note heads, shorten stem length by 3 pixels
        base_y_px += this.stem_direction * note.glyph.stem_offset;

        // Don't go all the way to the top (for thicker stems)
        var y_displacement = Vex.Flow.STEM_WIDTH;

        if (!note.hasStem()) {
          if (note.isRest() && this.render_options.show_stemlets) {
            var centerGlyphX = note.getCenterGlyphX();

            var width = this.render_options.beam_width;
            var total_width = ((this.beam_count - 1)* width * 1.5) + width;

            var stemlet_height = (total_width - y_displacement +
              this.render_options.stemlet_extension);

            var beam_y = this.getSlopeY(centerGlyphX, first_x_px,
                            first_y_px, this.slope) + this.y_shift;
            var start_y = beam_y + (Vex.Flow.Stem.HEIGHT * this.stem_direction);
            var end_y = beam_y + (stemlet_height * this.stem_direction);

            // Draw Stemlet
            note.setStem(new Vex.Flow.Stem({
              x_begin: centerGlyphX,
              x_end: centerGlyphX,
              y_bottom: this.stem_direction === 1 ? end_y : start_y,
              y_top: this.stem_direction === 1 ? start_y : end_y,
              y_extend: y_displacement,
              stem_extension: -1, // To avoid protruding through the beam
              stem_direction: this.stem_direction
            }));
          }

          continue;
        }

        var slope_y = this.getSlopeY(x_px, first_x_px, first_y_px,
                        this.slope) + this.y_shift;

        note.setStem(new Vex.Flow.Stem({
          x_begin: x_px - (Vex.Flow.STEM_WIDTH/2),
          x_end: x_px,
          y_top: this.stem_direction === 1 ? top_y_px : base_y_px,
          y_bottom: this.stem_direction === 1 ? base_y_px :  top_y_px ,
          y_extend: y_displacement,
          stem_extension: Math.abs(top_y_px - slope_y) - Stem.HEIGHT - 1,
          stem_direction: this.stem_direction
        }));
      }
    }
` 

var tokens = [...acorn.tokenizer(str)];

var comments = [], tokens = [];

var ast = acorn.parse(str, {
	// collect ranges for each node
	ranges: true,
	// collect comments in Esprima's format
	onComment: comments,
	// collect token ranges
	onToken: tokens
});

console.log(ast)
