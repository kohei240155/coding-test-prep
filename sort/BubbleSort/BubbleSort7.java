package BubbleSort;

import java.util.Arrays;

public class BubbleSort7 {

	public static void bubbleSort(int[] array) {
		for (int i = 0; i < array.length - 1; i++) {
			for (int j = 0; j < array.length - 1 - i; j++) {
				if (array[j] > array[j + 1]) {
					int temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
				}
			}
		}
	}
	
	public static void main(String[] args) {
		int[] array = {3, 1, 2, 9, 6, 5};
		bubbleSort(array);
		System.out.println(Arrays.toString(array));
	}

}
