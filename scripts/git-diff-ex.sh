#!/bin/bash

# Present git diff output not paginated and limited to the files
# names and lines changed. Used with release script with the --no-publish
# option.

git diff --color=always "$@" | awk '
# 1. Match and print "--- a/" lines
/^(\033\[(([0-9]{1,2};?){1,10})m)?(--- a\/)/ {
   print $0 
}

# 2. Match and then skip "--- a/" and "+++ b/" lines to avoid being printed again
# in the next step.
/^(\033\[(([0-9]{1,2};?){1,10})m)?(--- a\/|\+\+\+ b\/)/ {
   next 
}

# 3. Now print the remaining "+" and "-" lines ONLY! Note: doing step 2 above first was required or
# else those lines would have been matched by this matcher below too since they also begin with 
# the "+" and "-" symbols.
/^(\033\[(([0-9]{1,2};?){1,10})m)?[-+]/ {
    print $0 
}
'