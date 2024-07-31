package gnomeSort;

import java.util.Arrays;

public class GnomeSort6 {

	public static void gnomeSort(int[] array) {
		int index = 0;
		int n = array.length;
		
		while (index < n) {
			if (index == 0 || array[index - 1] <= array[index]) {
				index++;
			} else {
				int temp = array[index];
				array[index] = array[index - 1];
				array[index - 1] = temp;
				index--;
			}
		}
	}
	
	public static void main(String[] args) {
		int[] array = {3, 1, 2, 5, 9, 2, 2, 4, 6, 2, 1, 3, 9};
		gnomeSort(array);
		System.out.println(Arrays.toString(array));
	}

}
