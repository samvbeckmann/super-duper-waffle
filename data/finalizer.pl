open IN, "<", "states.json";

my @vals = ();
my $min=1000000;
my $max=-1;
#voters/turnout * amb
while (<IN>) {
	if (m/\"name\"/g) {
		my $votes;
		my $turnout;
		my $amb;
		my @linevals = split ',';
		for $val (@linevals) {
			if ($val =~ m/\"votes\"/g) {
				($votes) = $val =~ m/(\d+)/g;
			} elsif ($val =~ m/\"turnout\"/g) {
				($turnout) = $val =~ m/(\d+)/g;
			} elsif ($val =~ m/\"ambiguity\"/g) {
				($amb) = $val =~ m/(\d*\.\d+)/g;
			}
		}
		my $val = $votes * $amb / $turnout;
		print "$votes\t$turnout\t$amb\t$val\n";
		push @vals, $val;
		if ($val > $max) {
			$max = $val;
		}
		if ($val < $min) {
			$min = $val;
		}
	}
}


print "Max:\t$max\nMin:\t$min\n";
close IN;

open OUT, ">", "finalScore.txt";

for $val (@vals) {
	my $curr = ($val - $min) / ($max - $min);
	print OUT ", \"final\": $curr\n";
}
