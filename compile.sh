#!/bin/bash
temp_file=/tmp/lodis.coffee
output_file=lodis.compiled.js
packed_file=lodis.packed.js

find lib -type f -name '*.coffee' | sort | xargs cat > $temp_file
coffee -pc $temp_file > $output_file
yuicompressor $output_file > $packed_file
