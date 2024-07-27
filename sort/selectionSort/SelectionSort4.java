package selectionSort;

import java.util.Arrays;

public class SelectionSort4 {
	
	public static void selectionSort(int[] array) {
		int n = array.length;
		
		for (int i = 0; i < n - 1; i++) {
			int minIndex = i;
			for (int j = i + 1; j < n; j++) {
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}
			
			int temp = array[minIndex];
			array[minIndex] = array[i];
			array[i] =temp;
		}
	}
	
	
	public static void main(String[] args) {
		int[] array = {3, 1, 2, 5, 9, 2, 2, 4, 6, 2, 1, 3, 9};
		selectionSort(array);
		System.out.println(Arrays.toString(array));
	}

}
