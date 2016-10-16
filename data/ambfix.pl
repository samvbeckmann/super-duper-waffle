open IN, "<", "states.json";
open OUT, ">", "temp.json";

while (<IN>) {
	my $line = $_;
	(my $amb) = $line =~ m/\"ambiguity\": (\d*\.\d+)/g;
	my $new = 0.98 * $amb + 0.01;
	$line =~ s/\"ambiguity\": $amb/\"ambiguity\": $new/g;
	print OUT $line;
}

close IN;
close OUT;
