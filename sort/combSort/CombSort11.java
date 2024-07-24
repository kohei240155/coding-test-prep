package combSort;

import java.util.Arrays;

public class CombSort11 {

	public static void combSort(int[] array) {
		int n = array.length;
		int gap = n;
		boolean swapped = true;
		
		while (swapped) {
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
	
	public static int getNextGap(int gap) {
		gap = (10 * gap) / 13;
		if (1 > gap) {
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
