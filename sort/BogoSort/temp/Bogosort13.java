package BogoSort;

import java.util.Arrays;
import java.util.Random;

public class Bogosort13 {

	public static boolean isSorted(int[] array) {
		for (int i = 1; i < array.length; i++) {
			if (array[i - 1] > array[i]) {
				return false;
			}
		}
		return true;
	}

	public static void shuffle(int[] array) {
		Random random = new Random();
		for (int i = 0; i < array.length; i++) {
			int randomIndex = random.nextInt(array.length);
			int temp = array[randomIndex];
			array[randomIndex] = array[i];
			array[i] = temp;
		}
	}

	public static void bogosort(int[] array) {
		while (!isSorted(array)) {
			shuffle(array);
		}
	}

	public static void main(String[] args) {
		int[] array = { 3, 1, 2, 5, 4, 9, 6 };
		bogosort(array);
		System.out.println(Arrays.toString(array));
	}

}
