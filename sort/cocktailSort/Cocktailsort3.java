package cocktailSort;

import java.util.Arrays;

public class Cocktailsort3 {

	public static void cocktailSort(int[] array) {
		boolean swapped = true;
		int start = 0;
		int end = array.length - 1;
		
		while (swapped) {
			swapped = false;
			
			for (int i = start; i < end; i++) {
				if (array[i] > array[i + 1]) {
					int temp = array[i];
					array[i] = array[i + 1];
					array[i + 1] = temp;
					swapped = true;
				}
			}
			
			if (!swapped) {
				break;
			}
			
			swapped = false;
			
			end--;
			
			for (int i = end - 1; i >= start; i--) {
				if (array[i] > array[i + 1]) {
					int temp = array[i];
					array[i] = array[i + 1];
					array[i + 1] = temp;
					swapped = true;
				}
			}
			
			start++;
		}
	}
	
	public static void main(String[] args) {
		
		int[] array = {3, 15, 2, 65, 2, 19, 2, 43, 63, 92, 23, 65};
		cocktailSort(array);
		System.out.println(Arrays.toString(array));
	}
}
