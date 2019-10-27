import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;


public class Test {
	private static int cost;
	private static int missing;
	private static int[][] dist;
	private static int mistofirst;

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		PrintWriter wr = new PrintWriter(System.out);
		int T = Integer.parseInt(br.readLine().trim());
/*		for(int t_i=0; t_i < T; t_i++){
			int K = Integer.parseInt(br.readLine().trim());
			int N = Integer.parseInt(br.readLine().trim());
			int[][] distance = new int[N][N];
			for(int i_distance = 0; i_distance < N; i_distance++){
				String[] arr_distance = br.readLine().trim().split(" ");
				for(int j_distance=0; j_distance < arr_distance.length ; j_distance++){
					distance[i_distance][j_distance] = Integer.parseInt(arr_distance[j_distance]);
				}
			}
			int out_ = solve(distance, N, K);
			wr.println(out_);
		}*/
		int[][] distance = new int[4][4];
		distance[0][0] = 0; distance[0][1] = 1; distance[0][2]=15;distance[0][3] =6;
		distance[1][0] = 2; distance[1][1] = 0; distance[1][2]=7;distance[1][3] =3;
		distance[2][0] = 9; distance[2][1] = 6; distance[2][2]=0;distance[2][3] =12;
		distance[3][0] =10; distance[3][1] = 4; distance[3][2]=8;distance[3][3] =0;
		int N = 4;
		int K = 2;
		wr.print(solve(distance,N,K));
		wr.close();
		br.close();
	}
	
	private static void printArray(int[] input) {
	    System.out.print('\n');
	    int prv = 0;
	    int tcost = 0;
	    System.out.print("1 ->");
	    for(int i = 0; i < input.length; i++) {
	    	tcost = tcost + dist[prv][input[i]];
	        System.out.print(input[i]+1);
	        System.out.print(dist[prv][input[i]]);
	        System.out.print(" ->");
	        prv = input[i];
	    }
	    
	    if(prv == (missing -1)){
	    	tcost = tcost + mistofirst;
	    }else {
	    System.out.print(missing);
	    System.out.print(":");
	    System.out.println(dist[prv][missing-1]);
	    System.out.println(" ->1");
	    tcost = tcost + dist[prv][missing-1] + mistofirst;
	    }
	    System.out.println("tcost");
	    System.out.println(tcost);
	    if(tcost < cost) cost = tcost;
	}
	
	private static void swap(int[] input, int a, int b) {
	    int tmp = input[a];
	    input[a] = input[b];
	    input[b] = tmp;
	}
	
	public static <T> void printAllRecursive(int n, int[] elements, char delimiter) {
			 
			    if(n == 1) {
			        printArray(elements);
			    } else {
			        for(int i = 0; i < n-1; i++) {
			            printAllRecursive(n - 1, elements, delimiter);
			            if(n % 2 == 0) {
			                swap(elements, i, n-1);
			            } else {
			                swap(elements, 0, n-1);
			            }
			        }
			        printAllRecursive(n - 1, elements, delimiter);
			    }
			}
	
	
	static int solve(int[][] distance, int N, int K){
		missing = K;
		cost =Integer.MAX_VALUE;
		dist=distance;
		mistofirst=distance[K-1][0];
		System.out.println(mistofirst);
		int start = 1;//0 is alread in the array
		int end = N-1; //then append ->K->1
		int[] perm = new int[N-1];
		for(;start<N; start ++){
			perm[start-1] = start;
		}
		printAllRecursive(3, perm, ',');
		System.out.println();
		return cost;
	}
	
}
