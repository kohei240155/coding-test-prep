package CombSort;

import java.util.Arrays;

public class Combsort6 {

	public static void combSort(int[] array) {
		int n = array.length;
		int gap = n;
		boolean swapped = true;
		
		while (gap != 1 || swapped) {
			gap = getNextGap(gap);
			
			swapped = false;
			
			for (int i = 0; i < n - gap; i++) {
				if (array[i] > array[i + gap]) {
					int temp = array[i];
					array[i] = array[i + gap];
					array[i + gap] = temp;
					
					swapped = true;
				}
			}
		}
	}
	
	private static int getNextGap(int gap) {
		gap = (gap * 10) / 13;
		if (gap < 1) {
			return 1;
		}
		return gap;
	}
	
	public static void main(String[] args) {
		int[] array = {3, 1, 2, 5, 9, 2, 2, 4, 6, 2, 1, 3, 9};
		combSort(array);
		System.out.println(Arrays.toString(array));
	}

}
