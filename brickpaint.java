package sameesh.hackerrank.java.introduction;

import java.util.ArrayList;
import java.util.List;

public class JavaLoops {
	
	
		public static int minstart(List<List<Integer>> cost, int M, int N) {
			int newmin;
			int min = -1;
			for(int i=0; i< M; i++) {
					newmin =  minimumCost(i, 0, cost, M, N);
					System.out.println(i+ " : " + newmin);
					System.out.println("new min: " + newmin);
					if(newmin < min || min  == -1) {
						min = newmin;
					}
			}
			return min;
		}
	
		public static int minimumCost(int blockedIndex, int row, List<List<Integer>> cost,int M, int N) {
			System.out.println("row: " + row + ", blocked index : " + blockedIndex);
			int min = -1;
			int newmin;
			if(cost.size() == (row +1)) {
				//select the minimum and return the value 
				for(int i=0; i<M; i++) {
					if(i != blockedIndex) {
					  newmin =	cost.get(row).get(i);
					  if(newmin < min || min == -1) {
						  min = newmin;
					  }
					}
				}
			return min;
			}
			
			
			min = -1;
			for(int i=0; i< M; i++) {
				if(i != blockedIndex) {
					//row min
					newmin =  minimumCost(i, row + 1, cost, M, N);
					System.out.println(cost.get(row).get(i) + " : " + newmin);
					newmin = cost.get(row).get(i) + newmin;
					System.out.println("new min: " + newmin);
					if(newmin < min || min  == -1) {
						min = newmin;
					}
					
				}
			}
			return min;
		}
	
		public static void main(String[] args) {
	
		int N=4, M=4, i=0, j=1;
		
		
		List<List<Integer>> cost = new ArrayList<List<Integer>>();
		List<Integer> first = new ArrayList<>();
		first.add(32);
		first.add(2);
		first.add(3);
		first.add(4);
		List<Integer> sec = new ArrayList<>();
		sec.add(1);
		sec.add(3);
		sec.add(33);
		sec.add(6);
		List<Integer> third = new ArrayList<>();
		third.add(2);
		third.add(43);
		third.add(23);
		third.add(5);
		cost.add(first);
		cost.add(sec);
		cost.add(third);
		
		System.out.println( minstart(cost, M, N));
	}

}
