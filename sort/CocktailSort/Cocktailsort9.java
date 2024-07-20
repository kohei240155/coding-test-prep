package CocktailSort;

import java.util.Arrays;

public class Cocktailsort9 {

	public static void cocktailSort(int[] array) {
		int start = 0;
		int end = array.length - 1;
		boolean swapped = true;
		
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
			
			for (int i = end - 1; start < i; i--) {
				if (array[i - 1] > array[i]) {
					int temp = array[i];
					array[i] = array[i - 1];
					array[i - 1] = temp;
					swapped = true;
				}
			}
			
			start++;
		}
		
	}
	
	public static void main(String[] args) {
		int[] array = {3, 1, 2, 5, 9, 2, 2, 4, 6, 2, 1, 3, 9};
		cocktailSort(array);
		System.out.println(Arrays.toString(array));
	}
	

}
