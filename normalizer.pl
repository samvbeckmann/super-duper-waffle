open IN, "<", "data/states.json";

my @vals = ();
my $min;
my $max;


while (<IN>) {
	if (m/\"name\"/g) {
		my @lineSplit = split ',';
		my $trump;
		my $clinton;
		my $undecided;
		for $curr (@lineSplit) {
			if ($curr =~ m/\"trump\"/g) {
				($trump) = $curr =~ m/(\d*\.\d+)/g;
			} elsif ($curr =~ m/\"clinton\"/g) {
				($clinton) = $curr =~ m/(\d*\.\d+)/g;
			} elsif ($curr =~ m/\"undecided\"/g) {
				($undecided) = $curr =~ m/(\d*\.\d+)/g;
			}
		}
		my $val = abs($trump - $clinton) - $undecided;
		print "$trump\t$clinton\t$undecided\t$val\n";
		push @vals, $val;
		if ($val > $max) {
			$max = $val;
		}
		if ($val < $min) {
			$min = $val;
		}
	}
}

close IN;

open OUT, ">", "ambiguity.txt";

print "max:\t$max\nmin:\t$min\n";

for $val (@vals) {
	my $curr = 1 - ($val - $min) / ($max - $min);
	print OUT ", \"ambiguity\": $curr\n";
}
close OUT;
