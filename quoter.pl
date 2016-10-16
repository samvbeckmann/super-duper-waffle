open IN, "<", "data/states.json";
open OUT, ">", "out.txt";

while (<IN>) {
	s/\"(\d\d)\"/$1/g;
	print OUT $_;
}

close IN;
close OUT;
